import { Body, Controller } from '@nestjs/common';
import { Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: TaskDto) {
    this.taskService.createTask(task);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: TaskDto) {
    return this.taskService.updateTask(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
