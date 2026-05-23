import { SprintStatus } from '../../generated/prisma/enums.js';

export class CreateSprintDto {
  name: string;
  projectId: string;
  status?: SprintStatus;
  startDate?: string;
  endDate?: string;
}
