import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
    selectTaskState,
    (state: TaskState) => state.tasks
);

export const selectUserTasks = (userEmail: string) =>
    createSelector(selectTasks, (tasks) =>
        tasks.filter((task) => task.userEmail === userEmail)
    );
