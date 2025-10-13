import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { taskReducer } from './app/tasks/store/task.reducer';
import { TaskEffects } from './app/tasks/store/task.effects';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideStore({ tasks: taskReducer }),
        provideEffects([TaskEffects]),
    ],
}).catch(err => console.error(err));
