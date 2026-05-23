import { Priority, TicketStatus, TicketType } from '../../generated/prisma/enums.js';

export class CreateTicketDto {
  projectId: string;
  title: string;
  description?: string;
  type?: TicketType;
  priority?: Priority;
  status?: TicketStatus;
  sprintId?: string;
  assigneeId?: string;
}
