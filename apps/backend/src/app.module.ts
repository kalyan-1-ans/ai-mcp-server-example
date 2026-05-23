import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { SprintController } from './sprint/sprint.controller';
import { SprintService } from './sprint/sprint.service';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, SprintController, TicketController],
  providers: [AppService, PrismaService, ProjectService, SprintService, TicketService],
})
export class AppModule {}
