import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as z from 'zod';
import sqlite3 from 'sqlite3';
import path from 'path';

const server = new McpServer({
  name: 'project-management',
  version: '0.0.1',
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);

server.registerTool(
  'get_projects',
  {
    description: 'Fetch all projects from the backend',
    inputSchema: z.object({}),
  },
  async () => {
    const res = await fetch('http://localhost:3000/projects');
    const data = await res.json();
    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    };
  },
);

server.registerResource(
  'user',
  new ResourceTemplate('user://{id}', {
    list: async () => {
      const res = await fetch('http://localhost:3000/users');
      const data: { id: string; name: string }[] = await res.json();
      return {
        resources: data.map((u) => ({ uri: `user://${u.id}`, name: u.name })),
      };
    },
  }),
  {
    description: 'Fetch a user profile with their assigned tickets and projects',
    mimeType: 'application/json',
  },
  async (uri, params) => {
    const id = (params as { id: string }).id;
    const res = await fetch(`http://localhost:3000/users/${id}`);
    const data = await res.json();
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  },
);

server.registerResource(
  'schema',
  'schema://database',
  {
    description: 'The database schema for the project management system',
    mimeType: 'text/plain',
  },
  async () => {
    // fix the path to apps/backend/dev.db
    const dbPath = path.join(__dirname, '..', '..', 'backend', 'dev.db');
    // const dbPath = path.join(__dirname, '..', '..', 'backend', 'dev.db');

    const schemaPromise = new Promise<string>((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
      db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const tableNames = rows.map((row) => (row as any).name);
          resolve(tableNames.join('\n'));
        }
      });
    });

    const schema = await schemaPromise;

    return {
      contents: [
        {
          uri: 'schema://database',
          mimeType: 'text/plain',
          text: schema,
        },
      ],
    };
  },
);

server.registerPrompt(
  'review_workload',
  {
    description: "Review a team member's current workload and suggest priorities",
    argsSchema: { userId: z.string() },
  },
  async ({ userId }) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await res.json();

    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'resource' as const,
            resource: {
              uri: `user://${userId}`,
              mimeType: 'application/json',
              text: JSON.stringify(data, null, 2),
            },
          },
        },
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: "Review this person's assigned tickets and projects. Flag signs of overload (too many in-progress items, conflicting deadlines, scattered across too many projects). Suggest 1-2 things to drop, defer, or delegate, with reasoning.",
          },
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
