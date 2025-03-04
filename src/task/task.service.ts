import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  getTasks(): TaskDto[] {
    if (this.tasks.length === 0) {
      throw new HttpException('Tasks is empty', HttpStatus.NO_CONTENT);
    }
    return this.tasks;
  }

  getTaskById(id: string): TaskDto {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }

  createTask(task: TaskDto) {
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, task: TaskDto) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.tasks[index] = task;
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const deletedTask = this.tasks.splice(index, 1);
    return deletedTask[0];
  }
}
