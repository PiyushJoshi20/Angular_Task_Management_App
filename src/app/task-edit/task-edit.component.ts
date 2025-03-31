import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true, // ✅ Make it a standalone component
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule for ngModel support
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: any = { title: '', priority: 'Medium' }; // Default priority

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load task data (you may get it from a service or localStorage)
  }

  saveTask() {
    console.log('Task saved:', this.task);
    this.closeModal();
  }

  closeModal() {
    this.router.navigate(['/projects']); // Navigate back after closing modal
  }
}
