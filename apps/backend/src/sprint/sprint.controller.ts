import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintForProjectDto } from './dto/create-sprint-for-project.dto';
import { UpdateSprintStatusDto } from './dto/update-sprint-status.dto';

@Controller('sprints')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Post()
  create(@Body() dto: CreateSprintForProjectDto) {
    return this.sprintService.createForProject(dto);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string) {
    return this.sprintService.findByProject(projectId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSprintStatusDto) {
    return this.sprintService.updateStatus(id, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sprintService.findOne(id);
  }
}
