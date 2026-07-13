import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService{
  private readonly STORAGE_KEY = 'focusflow_tasks';
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadFromStorage());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private loadFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : this.getDefaultTasks();
    } catch {
      return this.getDefaultTasks();
    }
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  private get currentTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
   private getDefaultTasks(): Task[] {
    const today = new Date().toISOString().split('T')[0];
    return [
    
        
      
    ];
  }
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    const updated = [...this.currentTasks, newTask];
    this.tasksSubject.next(updated);    // notify all subscribers
    this.saveToStorage(updated);        // persist to LocalStorage
  }

  updateTask(id: string, changes: Partial<Task>): void {
    const updated = this.currentTasks.map(t =>
      t.id === id ? { ...t, ...changes } : t
    );
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  deleteTask(id: string): void {
    const updated = this.currentTasks.filter(t => t.id !== id);
    this.tasksSubject.next(updated);
    this.saveToStorage(updated);
  }

  toggleTask(id: string): void {
    this.updateTask(id, {
      completed: !this.currentTasks.find(t => t.id === id)?.completed
    });
  }

  getTaskById(id: string): Task | undefined {
    return this.currentTasks.find(t => t.id === id);
  }
}
