import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Users
  const users = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'hashed_password_1',
      avatarInitials: 'AJ',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'hashed_password_2',
      avatarInitials: 'BS',
    },
    {
      name: 'Carol White',
      email: 'carol@example.com',
      password: 'hashed_password_3',
      avatarInitials: 'CW',
    },
    {
      name: 'David Brown',
      email: 'david@example.com',
      password: 'hashed_password_4',
      avatarInitials: 'DB',
    },
    {
      name: 'Eva Martinez',
      email: 'eva@example.com',
      password: 'hashed_password_5',
      avatarInitials: 'EM',
    },
    {
      name: 'Frank Lee',
      email: 'frank@example.com',
      password: 'hashed_password_6',
      avatarInitials: 'FL',
    },
    {
      name: 'Grace Kim',
      email: 'grace@example.com',
      password: 'hashed_password_7',
      avatarInitials: 'GK',
    },
    {
      name: 'Henry Chen',
      email: 'henry@example.com',
      password: 'hashed_password_8',
      avatarInitials: 'HC',
    },
    {
      name: 'Isla Patel',
      email: 'isla@example.com',
      password: 'hashed_password_9',
      avatarInitials: 'IP',
    },
    {
      name: 'James Wilson',
      email: 'james@example.com',
      password: 'hashed_password_10',
      avatarInitials: 'JW',
    },
  ];

  const createdUsers: Record<string, string> = {};
  for (const user of users) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    createdUsers[user.email] = created.id;
  }
  console.log('Seeded 10 users.');

  // Project
  const project = await prisma.project.upsert({
    where: { id: 'proj_sleep_001' },
    update: {},
    create: {
      id: 'proj_sleep_001',
      title: 'Sleep Tracker App',
      shortDescription: 'A mobile app to track, analyze, and improve sleep quality.',
      longDescription:
        'A cross-platform mobile app that uses device motion sensors to automatically detect sleep sessions, estimate sleep stages, and provide actionable insights to help users build healthier sleep habits.',
    },
  });
  console.log('Seeded project:', project.title);

  const now = new Date();
  const daysAgo7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const days7Later = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const days8Later = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
  const days22Later = new Date(now.getTime() + 22 * 24 * 60 * 60 * 1000);

  // Sprints
  const sprint1 = await prisma.sprint.upsert({
    where: { id: 'sprint_sleep_001' },
    update: {},
    create: {
      id: 'sprint_sleep_001',
      name: 'Sprint 1 – Foundation',
      status: 'ACTIVE',
      startDate: daysAgo7,
      endDate: days7Later,
      projectId: project.id,
    },
  });

  const sprint2 = await prisma.sprint.upsert({
    where: { id: 'sprint_sleep_002' },
    update: {},
    create: {
      id: 'sprint_sleep_002',
      name: 'Sprint 2 – Core Features',
      status: 'PLANNED',
      startDate: days8Later,
      endDate: days22Later,
      projectId: project.id,
    },
  });
  console.log('Seeded 2 sprints.');

  // Tickets
  const tickets = [
    // Sprint 1
    {
      id: 'ticket_sleep_001',
      ticketNumber: 'SLEEP-1',
      title: 'Project setup and repository initialization',
      description:
        'Initialize the mobile app project (React Native/Flutter), configure linting, CI/CD pipeline, and set up branching strategy.',
      type: 'TECH' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'alice@example.com',
    },
    {
      id: 'ticket_sleep_002',
      ticketNumber: 'SLEEP-2',
      title: 'Design system and UI mockups',
      description:
        'Create Figma mockups for all main screens and define the design system (colors, typography, components).',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'bob@example.com',
    },
    {
      id: 'ticket_sleep_003',
      ticketNumber: 'SLEEP-3',
      title: 'User authentication (email + social login)',
      description: 'Implement sign up, login, password reset, and Google/Apple sign-in flows.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'IN_TEST' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'carol@example.com',
    },
    {
      id: 'ticket_sleep_004',
      ticketNumber: 'SLEEP-4',
      title: 'Backend API and database schema',
      description:
        'Set up backend service, define database schema for users and sleep sessions, and expose REST endpoints.',
      type: 'TECH' as const,
      priority: 'HIGH' as const,
      status: 'IN_PROGRESS' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'david@example.com',
    },
    {
      id: 'ticket_sleep_005',
      ticketNumber: 'SLEEP-5',
      title: 'Onboarding flow',
      description:
        'Build a 3–4 screen onboarding that explains the app, requests permissions (motion, notifications), and captures basic sleep goals.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'IN_PROGRESS' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'eva@example.com',
    },
    {
      id: 'ticket_sleep_006',
      ticketNumber: 'SLEEP-6',
      title: 'Manual sleep session start/stop',
      description:
        'Allow users to tap "Start Sleep" before bed and "Stop" upon waking, saving the session locally and to the backend.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'frank@example.com',
    },
    {
      id: 'ticket_sleep_007',
      ticketNumber: 'SLEEP-7',
      title: 'Automatic sleep detection via motion sensors',
      description:
        'Use device accelerometer and gyroscope to detect when the user falls asleep and wakes up.',
      type: 'RESEARCH' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'grace@example.com',
    },
    {
      id: 'ticket_sleep_008',
      ticketNumber: 'SLEEP-8',
      title: 'Sleep stage estimation',
      description:
        'Estimate light, deep, and REM sleep based on motion patterns and time-of-night heuristics.',
      type: 'RESEARCH' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: sprint1.id,
      assigneeEmail: 'henry@example.com',
    },
    // Sprint 2
    {
      id: 'ticket_sleep_009',
      ticketNumber: 'SLEEP-9',
      title: 'Daily sleep summary screen',
      description:
        "Show last night's total sleep, time in bed, sleep efficiency, and a stage breakdown chart.",
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'isla@example.com',
    },
    {
      id: 'ticket_sleep_010',
      ticketNumber: 'SLEEP-10',
      title: 'Sleep history and trends dashboard',
      description:
        'Display weekly and monthly graphs of sleep duration, quality score, and consistency.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'james@example.com',
    },
    {
      id: 'ticket_sleep_011',
      ticketNumber: 'SLEEP-11',
      title: 'Smart alarm',
      description:
        'Wake the user within a chosen window during their lightest sleep phase using a gentle alarm.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'alice@example.com',
    },
    {
      id: 'ticket_sleep_012',
      ticketNumber: 'SLEEP-12',
      title: 'Bedtime reminder notifications',
      description: "Send a configurable push notification ahead of the user's target bedtime.",
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'bob@example.com',
    },
    {
      id: 'ticket_sleep_013',
      ticketNumber: 'SLEEP-13',
      title: 'Sleep goals and streaks',
      description:
        'Let users set a nightly sleep duration goal and track consecutive nights they hit it.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'carol@example.com',
    },
    {
      id: 'ticket_sleep_014',
      ticketNumber: 'SLEEP-14',
      title: 'Sleep sounds and white noise player',
      description:
        'Provide a library of ambient sounds with a sleep timer that fades out automatically.',
      type: 'STORY' as const,
      priority: 'LOW' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'david@example.com',
    },
    {
      id: 'ticket_sleep_015',
      ticketNumber: 'SLEEP-15',
      title: 'Apple Health and Google Fit integration',
      description: 'Sync sleep sessions bi-directionally with HealthKit and Google Fit.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: sprint2.id,
      assigneeEmail: 'eva@example.com',
    },
  ];

  for (const ticket of tickets) {
    const { assigneeEmail, ...ticketData } = ticket;
    await prisma.ticket.upsert({
      where: { ticketNumber: ticketData.ticketNumber },
      update: {},
      create: {
        ...ticketData,
        projectId: project.id,
        assigneeId: createdUsers[assigneeEmail],
      },
    });
  }
  console.log('Seeded 15 tickets.');

  // ── Task Manager App ──────────────────────────────────────────────────────

  const daysAgo21 = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
  const daysAgo6 = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
  const days9Later = new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000);
  const days23Later = new Date(now.getTime() + 23 * 24 * 60 * 60 * 1000);

  const todoProject = await prisma.project.upsert({
    where: { id: 'proj_todo_001' },
    update: {},
    create: {
      id: 'proj_todo_001',
      title: 'Task Manager App',
      shortDescription: 'A productivity app for managing tasks, lists, and collaborative projects.',
      longDescription:
        'A cross-platform task manager that lets individuals and teams capture, organize, and track work across projects and lists. Features rich task metadata (due dates, priorities, labels, subtasks), smart views, offline-first sync, and team collaboration with real-time updates.',
    },
  });
  console.log('Seeded project:', todoProject.title);

  const todoSprint1 = await prisma.sprint.upsert({
    where: { id: 'sprint_todo_001' },
    update: {},
    create: {
      id: 'sprint_todo_001',
      name: 'Sprint 1 – Foundation',
      status: 'COMPLETED',
      startDate: daysAgo21,
      endDate: daysAgo7,
      projectId: todoProject.id,
    },
  });

  const todoSprint2 = await prisma.sprint.upsert({
    where: { id: 'sprint_todo_002' },
    update: {},
    create: {
      id: 'sprint_todo_002',
      name: 'Sprint 2 – Core Features',
      status: 'ACTIVE',
      startDate: daysAgo6,
      endDate: days8Later,
      projectId: todoProject.id,
    },
  });

  const todoSprint3 = await prisma.sprint.upsert({
    where: { id: 'sprint_todo_003' },
    update: {},
    create: {
      id: 'sprint_todo_003',
      name: 'Sprint 3 – Advanced Features',
      status: 'PLANNED',
      startDate: days9Later,
      endDate: days23Later,
      projectId: todoProject.id,
    },
  });
  console.log('Seeded 3 sprints for Task Manager App.');

  const todoTickets = [
    // Sprint 1 – Foundation (all DONE)
    {
      id: 'ticket_todo_001',
      ticketNumber: 'TODO-1',
      title: 'Project setup and repository initialization',
      description:
        'Initialize the project, configure linting, CI/CD pipeline, and set up branching strategy and code review workflow.',
      type: 'TECH' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: todoSprint1.id,
      assigneeEmail: 'alice@example.com',
    },
    {
      id: 'ticket_todo_002',
      ticketNumber: 'TODO-2',
      title: 'Design system and UI mockups',
      description:
        'Create Figma mockups for all main screens and define the design system (colors, typography, reusable components).',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: todoSprint1.id,
      assigneeEmail: 'bob@example.com',
    },
    {
      id: 'ticket_todo_003',
      ticketNumber: 'TODO-3',
      title: 'User authentication',
      description: 'Implement sign up, login, password reset, and Google/Apple sign-in flows.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: todoSprint1.id,
      assigneeEmail: 'carol@example.com',
    },
    {
      id: 'ticket_todo_004',
      ticketNumber: 'TODO-4',
      title: 'Backend API and database schema',
      description:
        'Set up backend service, define schema for users, tasks, lists, and tags, and expose REST/GraphQL endpoints.',
      type: 'TECH' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: todoSprint1.id,
      assigneeEmail: 'david@example.com',
    },
    // Sprint 2 – Core Features (mixed statuses)
    {
      id: 'ticket_todo_005',
      ticketNumber: 'TODO-5',
      title: 'Create, edit, and delete tasks',
      description: 'Core CRUD for tasks including title, notes, and a tap-to-complete checkbox.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'DONE' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'eva@example.com',
    },
    {
      id: 'ticket_todo_006',
      ticketNumber: 'TODO-6',
      title: 'Task lists and projects',
      description:
        'Allow users to organize tasks into multiple lists or projects with custom names and icons.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'IN_TEST' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'frank@example.com',
    },
    {
      id: 'ticket_todo_007',
      ticketNumber: 'TODO-7',
      title: 'Due dates and reminders',
      description:
        'Add a date/time picker to tasks and send local push notifications at the scheduled reminder time.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'IN_PROGRESS' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'grace@example.com',
    },
    {
      id: 'ticket_todo_008',
      ticketNumber: 'TODO-8',
      title: 'Priority levels and labels',
      description:
        'Support priority flags (low/medium/high/urgent) and color-coded labels for filtering and sorting.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'IN_PROGRESS' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'henry@example.com',
    },
    {
      id: 'ticket_todo_009',
      ticketNumber: 'TODO-9',
      title: 'Subtasks and checklists',
      description:
        'Allow nested subtasks within a parent task with their own completion state and progress indicator.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'isla@example.com',
    },
    {
      id: 'ticket_todo_010',
      ticketNumber: 'TODO-10',
      title: 'Recurring tasks',
      description:
        'Support repeat rules (daily, weekly, custom intervals) that auto-generate the next occurrence on completion.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: todoSprint2.id,
      assigneeEmail: 'james@example.com',
    },
    // Sprint 3 – Advanced Features (all TODO)
    {
      id: 'ticket_todo_011',
      ticketNumber: 'TODO-11',
      title: 'Drag-and-drop reordering',
      description:
        'Let users manually reorder tasks within a list and move tasks between lists via drag-and-drop.',
      type: 'STORY' as const,
      priority: 'LOW' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'alice@example.com',
    },
    {
      id: 'ticket_todo_012',
      ticketNumber: 'TODO-12',
      title: 'Search and filters',
      description:
        'Full-text search across tasks plus filters by list, label, priority, due date, and completion status.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'bob@example.com',
    },
    {
      id: 'ticket_todo_013',
      ticketNumber: 'TODO-13',
      title: 'Today and upcoming views',
      description:
        'Smart views that aggregate tasks due today, tomorrow, and over the next 7 days across all lists.',
      type: 'STORY' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'carol@example.com',
    },
    {
      id: 'ticket_todo_014',
      ticketNumber: 'TODO-14',
      title: 'Offline mode and sync',
      description:
        'Cache data locally so users can create and edit tasks offline, with conflict-resolved sync when reconnected.',
      type: 'TECH' as const,
      priority: 'HIGH' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'david@example.com',
    },
    {
      id: 'ticket_todo_015',
      ticketNumber: 'TODO-15',
      title: 'Collaboration and shared lists',
      description:
        'Invite other users to a shared list via email, with real-time updates and per-user assignment of tasks.',
      type: 'STORY' as const,
      priority: 'MEDIUM' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'eva@example.com',
    },
    {
      id: 'ticket_todo_016',
      ticketNumber: 'TODO-16',
      title: 'Productivity stats dashboard',
      description:
        'Show tasks completed per day/week, completion streaks, and breakdown by project or label.',
      type: 'STORY' as const,
      priority: 'LOW' as const,
      status: 'TODO' as const,
      sprintId: todoSprint3.id,
      assigneeEmail: 'frank@example.com',
    },
  ];

  for (const ticket of todoTickets) {
    const { assigneeEmail, ...ticketData } = ticket;
    await prisma.ticket.upsert({
      where: { ticketNumber: ticketData.ticketNumber },
      update: {},
      create: {
        ...ticketData,
        projectId: todoProject.id,
        assigneeId: createdUsers[assigneeEmail],
      },
    });
  }
  console.log('Seeded 16 tickets for Task Manager App.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
