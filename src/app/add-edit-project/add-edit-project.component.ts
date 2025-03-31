import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-add-edit-project',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Ensure FormsModule is included
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.css']
})
export class AddEditProjectComponent implements OnInit {
  project: any = { title: '', description: '', manager: '', startDate: '', endDate: '', teamMembers: [] };
  availableUsers = ['John Doe', 'Jane Smith', 'Mike Johnson']; // ✅ Predefined team members
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.isEdit = true;
      const storedProject = localStorage.getItem(`project_${projectId}`);
      if (storedProject) this.project = JSON.parse(storedProject);
    }
  }

 saveProject() {
  if (typeof window === 'undefined') return; // ✅ Prevent SSR issue

  const username = localStorage.getItem('username');
  if (!username) {
    this.router.navigate(['/login']);
    return;
  }

  // ✅ Load existing projects
  let projects = JSON.parse(localStorage.getItem(`projects_${username}`) || '[]');

  if (this.isEdit) {
    // ✅ Update the existing project
    const index = projects.findIndex((p: any) => p.id === this.project.id);
    if (index !== -1) {
      projects[index] = this.project;
    }
  } else {
    // ✅ Create a new project
    this.project.id = Date.now();
    projects.push(this.project);
  }

  // ✅ Save updated projects
  localStorage.setItem(`projects_${username}`, JSON.stringify(projects));

  // ✅ Navigate back to Dashboard
  this.router.navigate(['/projects']);
}


  cancel() {
    this.router.navigate(['/projects']);
  }
}
