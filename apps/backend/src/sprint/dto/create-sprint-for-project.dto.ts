import { SprintStatus } from '../../generated/prisma/enums.js';

export class CreateSprintForProjectDto {
  projectId: string;
  name: string;
  status?: SprintStatus;
  startDate?: string;
  endDate?: string;
}
