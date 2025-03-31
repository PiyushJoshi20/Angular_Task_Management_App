import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'projects', component: DashboardComponent }, // ✅ Main Dashboard
  { path: 'projects/new', component: AddEditProjectComponent }, // ✅ Add New Project
  { path: 'projects/edit/:id', component: AddEditProjectComponent }, // ✅ Edit Project
  { path: 'projects/:id', component: ProjectDetailsComponent }, // ✅ Project Details Page
  { path: 'projects/:id/task/:taskId', component: TaskEditComponent }, // ✅ Edit Task Page in Modal
  { path: '', redirectTo: '/login', pathMatch: 'full' } // ✅ Default Route to Login
];

export const appRouting = provideRouter(routes);
