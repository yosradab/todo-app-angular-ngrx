import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  login(email: string) {
    this.userSubject.next({ email });
  }

  logout() {
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
