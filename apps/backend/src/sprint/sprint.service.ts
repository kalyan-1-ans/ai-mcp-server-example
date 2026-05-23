import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { CreateSprintForProjectDto } from './dto/create-sprint-for-project.dto';
import { UpdateSprintStatusDto } from './dto/update-sprint-status.dto';

@Injectable()
export class SprintService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSprintDto) {
    return this.prisma.sprint.create({
      data: {
        name: dto.name,
        projectId: dto.projectId,
        status: dto.status,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  createForProject(dto: CreateSprintForProjectDto) {
    return this.prisma.sprint.create({
      data: {
        name: dto.name,
        projectId: dto.projectId,
        status: dto.status,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  updateStatus(id: string, dto: UpdateSprintStatusDto) {
    return this.prisma.sprint.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  findByProject(projectId: string) {
    return this.prisma.sprint.findMany({
      where: { projectId },
      include: { tickets: true },
    });
  }

  findOne(id: string) {
    return this.prisma.sprint.findUniqueOrThrow({
      where: { id },
      include: { tickets: true },
    });
  }
}
