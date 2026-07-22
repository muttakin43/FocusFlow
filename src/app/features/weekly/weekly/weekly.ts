import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-weekly',
  standalone: false,
  templateUrl: './weekly.html',
  styleUrl: './weekly.scss',
})
export class Weekly implements OnInit{
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.taskService.tasks$
      .subscribe(tasks => {

        this.tasks = tasks;

      });

  }
  get weeklyTasksCount(): number {
  return this.tasks.filter(task => {

    const taskDate = new Date(task.dueDate);

    const today = new Date();

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return taskDate > today && taskDate <= nextWeek;

  }).length;
}
get completedWeeklyTasks(): number {

  return this.tasks.filter(task => {

    const taskDate = new Date(task.dueDate);

    const today = new Date();

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return (
      task.completed &&
      taskDate > today &&
      taskDate <= nextWeek
    );

  }).length;
}
   getNext7Days(): Date[] {

    const days: Date[] = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {

      const day = new Date(today);

      day.setDate(today.getDate() + i);

      days.push(day);
    }

    return days;
  }
    getTasksForDate(date: Date): Task[] {

  return this.tasks.filter(task => {

    return (
      new Date(task.dueDate)
        .toDateString()
      ===
      date.toDateString()
    );

  });

}
isToday(date: Date): boolean {

  return (
    date.toDateString() ===
    new Date().toDateString()
  );

}
}
