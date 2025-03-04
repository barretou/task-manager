import { Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  getTasks(): TaskDto[] {
    return this.tasks;
  }

  getTaskById(id: string): TaskDto | undefined {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return undefined;
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
      return undefined;
    }
    this.tasks[index] = task;
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return undefined;
    }
    const deletedTask = this.tasks.splice(index, 1);
    return deletedTask[0];
  }
}
