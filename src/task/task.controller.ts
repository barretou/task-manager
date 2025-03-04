import { Body, Controller } from '@nestjs/common';
import { Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.get();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Post()
  createTask(@Body() task: TaskDto) {
    this.taskService.create(task);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: TaskDto) {
    return this.taskService.update(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
