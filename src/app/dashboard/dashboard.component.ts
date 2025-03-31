import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  projects: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProjects();

    // ✅ Apply dark mode if previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }

  loadProjects() {
    const savedProjects = localStorage.getItem(`projects_${this.username}`);
    this.projects = savedProjects ? JSON.parse(savedProjects) : [];

    // ✅ Ensure tasks array exists
    this.projects.forEach((project) => {
      if (!project.tasks) {
        project.tasks = [];
      }
    });
  }

  get totalPending(): number {
    return this.projects.reduce((sum, project) => sum + this.getTaskCount(project, 'Pending'), 0);
  }

  get totalInProgress(): number {
    return this.projects.reduce((sum, project) => sum + this.getTaskCount(project, 'In Progress'), 0);
  }

  get totalCompleted(): number {
    return this.projects.reduce((sum, project) => sum + this.getTaskCount(project, 'Completed'), 0);
  }

  getTaskCount(project: any, status: string): number {
    return project.tasks?.filter((task: any) => task.status === status).length || 0;
  }

  addProject() {
    this.router.navigate(['/projects/new']);
  }

  viewProject(id: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate([`/projects/${id}`]);
    }
  }

  editProject(id: number) {
    if (id !== undefined && id !== null) {
      this.router.navigate([`/projects/edit/${id}`]);
    }
  }

  deleteProject(index: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects.splice(index, 1);
      localStorage.setItem(`projects_${this.username}`, JSON.stringify(this.projects));
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
  }
}
