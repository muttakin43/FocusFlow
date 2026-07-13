import { Component,OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../core/models/task.model';
import { futureDateValidator } from '../../validators/date-validator';
export interface TaskFormDialogData {
  task?: Task;  
}

@Component({
  selector: 'app-task-form-modal',
  standalone: false,
  templateUrl: './task-form-modal.html',
  styleUrl: './task-form-modal.scss',
})
export class TaskFormModal implements OnInit{
  form!: FormGroup;
  isEditMode = false;
  availableTags = ['angular', 'api', 'forms', 'rxjs', 'testing', 'setup', 'design'];
  timeOptions = [
    '8:00 AM','9:00 AM','10:00 AM','11:00 AM',
    '12:00 PM','1:00 PM','2:00 PM','3:00 PM',
    '4:00 PM','5:00 PM','6:00 PM'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormModal>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData
  ) {}

  ngOnInit() {
    this.isEditMode = !!this.data?.task;
    this.buildForm();

    // if edit mode, pre-fill form with existing task values
    if (this.isEditMode && this.data.task) {
      this.form.patchValue(this.data.task);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
      ],
      priority: ['medium', Validators.required],
      dueDate: [
        new Date().toISOString().split('T')[0],
        [Validators.required, futureDateValidator]
      ],
      dueTime:  ['9:00 AM', Validators.required],
      notes:    ['', Validators.maxLength(300)],
      tags:     [[]]  // array field, no validators
    });
  }

  // ─── Convenience getters (used in template) ───────────────

  get titleControl()   { return this.form.get('title')!; }
  get dueDateControl() { return this.form.get('dueDate')!; }
  get notesControl()   { return this.form.get('notes')!; }

  // ─── Submit ───────────────────────────────────────────────

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show all validation errors
      return;
    }
    this.dialogRef.close(this.form.value); // send form value back to opener
  }

  onCancel() {
    this.dialogRef.close(); // close with no data = cancelled
  }
}
