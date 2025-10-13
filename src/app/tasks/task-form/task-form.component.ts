import { Component, EventEmitter, Input, Output, inject, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';
import * as TaskActions from '../store/task.actions';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="card p-3 mt-3">
      <div class="mb-2">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" formControlName="title" />
        <div *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched" class="text-danger">
          Title is required
        </div>
      </div>
      <div class="mb-2">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" formControlName="description"></textarea>
      </div>
      <div class="mb-2">
        <label for="priority" class="form-label">Priority (1-5)</label>
        <input type="number" class="form-control" formControlName="priority" min="1" max="5" />
        <div *ngIf="taskForm.get('priority')?.invalid && taskForm.get('priority')?.touched" class="text-danger">
          Priority must be between 1 and 5
        </div>
      </div>
      <div class="mb-2">
        <label for="dueDate" class="form-label">Due Date</label>
        <input type="date" class="form-control" formControlName="dueDate" />
        <div *ngIf="taskForm.get('dueDate')?.invalid && taskForm.get('dueDate')?.touched" class="text-danger">
          Due date is required
        </div>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="taskForm.invalid">
        {{ task ? 'Update' : 'Add' }} Task
      </button>
      <button type="button" class="btn btn-secondary ms-2" (click)="resetForm()">Cancel</button>
    </form>
  `,
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() formReset = new EventEmitter<void>();
  taskForm: FormGroup;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private authService = inject(AuthService);

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = {
        id: this.task ? this.task.id : uuidv4(),
        ...this.taskForm.value,
        completed: this.task ? this.task.completed : false,
        userEmail: this.authService.getUser()!.email,
      };
      if (this.task) {
        this.store.dispatch(TaskActions.updateTask({ task }));
      } else {
        this.store.dispatch(TaskActions.addTask({ task }));
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.taskForm.reset();
    this.formReset.emit();
  }
}
