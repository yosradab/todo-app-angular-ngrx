import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import * as TaskActions from '../store/task.actions';
import { selectUserTasks } from '../store/task.selectors';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {TaskFormComponent} from "../task-form/task-form.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  template: `
    <div class="container mt-5">
      <h2 class="mb-3">Tasks for {{ user?.email }}</h2>
      <button class="btn btn-danger mb-3" (click)="logout()">Logout</button>
      <app-task-form (formReset)="selectedTask = null" [task]="selectedTask"></app-task-form>
      <ul class="list-group mt-3">
        <li
            *ngFor="let task of tasks$ | async"
            class="list-group-item"
            [ngClass]="{'completed-task': task.completed}"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>{{ task.title }}</h5>
              <p>{{ task.description }}</p>
              <p>Priority: {{ task.priority }} | Due: {{ task.dueDate }}</p>
            </div>
            <div>
              <button class="btn btn-sm btn-primary me-2" (click)="editTask(task)">Edit</button>
              <button class="btn btn-sm btn-danger me-2" (click)="deleteTask(task.id)">Delete</button>
              <button class="btn btn-sm btn-success" (click)="toggleCompletion(task.id)">
                {{ task.completed ? 'Undo' : 'Complete' }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .completed-task {
      opacity: 0.6;
      text-decoration: line-through;
    }
  `]
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;
  user = inject(AuthService).getUser();
  selectedTask: Task | null = null;
  private store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.tasks$ = this.store.select(selectUserTasks(this.user!.email));
  }

  editTask(task: Task) {
    this.selectedTask = task;
  }

  deleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  toggleCompletion(id: string) {
    this.store.dispatch(TaskActions.toggleTaskCompletion({ id }));
  }

  logout() {
    this.store.dispatch(TaskActions.clearTasks());
    this.authService.logout(); // Clear user
    this.router.navigate(['/login']); // Redirect to login
  }
}
