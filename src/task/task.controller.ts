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

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    const response = this.taskService.getTaskById(id);
    return response ? response : 'Task not found';
  }

  @Post()
  createTask(@Body() task: TaskDto) {
    this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: TaskDto) {
    const response = this.taskService.updateTask(id, task);
    return response ? response : 'Task not found';
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    const response = this.taskService.deleteTask(id);
    return response ? response : 'Task not found';
  }
}
