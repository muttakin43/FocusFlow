import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: false,
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
   @Input()  task!: Task;               // receives data FROM parent
  @Output() toggle = new EventEmitter<Task>(); // sends event TO parent
  @Output() edit = new EventEmitter<Task>();
@Output() delete = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.task);
  }
   onEdit() {
    
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
