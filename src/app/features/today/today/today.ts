import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormModal } from '../../../shared/components/task-form-modal/task-form-modal';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-today',
  standalone: false,
  templateUrl: './today.html',
  styleUrls: ['./today.scss'],
   
})
export class Today implements OnInit {
    
tasks: Task[] = [
    
  ];
  filteredTasks: Task[] = [];

searchTerm = '';

selectedPriority = 'all';

selectedStatus = 'all';
  
constructor( private taskService: TaskService,
  private dialog: MatDialog,
private cdr: ChangeDetectorRef,
  private snackBar: MatSnackBar) {}

   completedCount = 0;
  totalCount = 0;
  overdueCount = 0;
  

  ngOnInit(): void {

    this.taskService.tasks$.subscribe(tasks => {

  const today =
    new Date()
      .toISOString()
      .split('T')[0];

  this.tasks = tasks.filter(
    task => task.dueDate === today
  );

  this.applyFilters();

  this.totalCount = this.tasks.length;

  this.completedCount =
    this.tasks.filter(
      t => t.completed
    ).length;

  this.cdr.detectChanges();

});

  }

  toggleTask(task: Task) {
  this.taskService.toggleTask(task.id);
}

openAddTask() {

  const dialogRef = this.dialog.open(
    TaskFormModal,
    {
      width: '600px'
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    this.taskService.addTask(result);

     this.snackBar.open(
    'Task Added Successfully',
    'OK',
    {
      duration: 3000
    }
  );
  });

}
deleteTask(id: string) {

  const confirmed =
    confirm('Delete this task?');

  if (!confirmed) return;

  this.taskService.deleteTask(id);
   this.snackBar.open(
    'Task Deleted Successfully',
    'OK',
    {
      duration: 3000
    }
  );
}
openEditTask(task: Task) {

  const dialogRef = this.dialog.open(
    TaskFormModal,
    {
      width: '600px',
      data: { task }
    }
  );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) return;

      this.taskService.updateTask(
        task.id,
        result
      );
      this.snackBar.open(
  'Task Updated Successfully',
  'OK',
  {
    duration: 3000
  }
);

    });

}
onSearchChange() {
  this.applyFilters();
}

onPriorityChange() {
  this.applyFilters();
}

onStatusChange() {
  this.applyFilters();
}
applyFilters() {

  let filtered = [...this.tasks];

  // Search
  if (this.searchTerm.trim()) {

    filtered = filtered.filter(task =>
      task.title
        .toLowerCase()
        .includes(
          this.searchTerm.toLowerCase()
        )
    );

  }

  // Priority Filter
  if (this.selectedPriority !== 'all') {

    filtered = filtered.filter(task =>
      task.priority === this.selectedPriority
    );

  }

  // Status Filter
  if (this.selectedStatus === 'completed') {

    filtered = filtered.filter(task =>
      task.completed
    );

  }

  if (this.selectedStatus === 'pending') {

    filtered = filtered.filter(task =>
      !task.completed
    );

  }

  this.filteredTasks = filtered;

}


}


