import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  update(id: string, dto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: dto,
    });
  }

  async create(dto: CreateTicketDto) {
    const [project, count] = await Promise.all([
      this.prisma.project.findUniqueOrThrow({
        where: { id: dto.projectId },
        select: { title: true },
      }),
      this.prisma.ticket.count({ where: { projectId: dto.projectId } }),
    ]);
    const prefix = project.title.replace(/\s+/g, '').slice(0, 4).toUpperCase();
    const ticketNumber = `${prefix}-${count + 1}`;

    return this.prisma.ticket.create({
      data: {
        ticketNumber,
        projectId: dto.projectId,
        title: dto.title,
        description: dto.description,
        type: dto.type,
        priority: dto.priority,
        status: dto.status,
        sprintId: dto.sprintId,
        assigneeId: dto.assigneeId,
      },
    });
  }
}
