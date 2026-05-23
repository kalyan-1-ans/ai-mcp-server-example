import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarInitials: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarInitials: true,
        createdAt: true,
        assignedTickets: {
          select: {
            id: true,
            ticketNumber: true,
            title: true,
            type: true,
            priority: true,
            status: true,
            createdAt: true,
            project: {
              select: { id: true, title: true, shortDescription: true },
            },
          },
        },
      },
    });

    const projects = Array.from(
      new Map(
        user.assignedTickets
          .map((t) => t.project)
          .filter(Boolean)
          .map((p) => [p.id, p]),
      ).values(),
    );

    return { ...user, projects };
  }
}
