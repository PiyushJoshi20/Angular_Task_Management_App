import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

@Component({
  selector: 'app-project-details',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule], // ✅ Ensure CommonModule is included for ngClass
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

 ngOnInit(): void {
  if (typeof window === 'undefined') return; // ✅ Prevent SSR error

  const projectId = this.route.snapshot.paramMap.get('id');
  if (projectId) {
    const storedProject = localStorage.getItem(`project_${projectId}`);
    this.project = storedProject ? JSON.parse(storedProject) : null;

    if (!this.project) {
      console.error('Project not found.');
      this.router.navigate(['/projects']); // ✅ Redirect if project doesn't exist
    }
  }
}


  editTask(taskId: number) {
    this.router.navigate([`/projects/${this.project.id}/task/${taskId}`]);
  }

  deleteTask(taskId: number) {
    this.project.tasks = this.project.tasks.filter((task: any) => task.id !== taskId);
    localStorage.setItem(`project_${this.project.id}`, JSON.stringify(this.project));
  }
}
