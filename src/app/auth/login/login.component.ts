import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="card p-4">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" formControlName="email" />
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="text-danger">
            Valid email is required
          </div>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email);
      this.router.navigate(['/tasks']);
    }
  }
}
