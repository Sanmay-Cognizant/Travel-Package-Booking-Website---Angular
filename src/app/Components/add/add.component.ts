import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentserviceService } from '../../Services/agentservice.service'; // Import the service
import { Router, RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-add',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  newPackage: any = {
    title: '',
    duration: '', // Added duration field
    description: '',
    price: null,
    includedServices: '',
    category: '',
    travelAgent: '',
    image: '' // Added image field
  };
 
  constructor(private agentService: AgentserviceService,private router: Router) {}
 
  onSubmit(): void {
    //title duration price are necessary
    if (this.newPackage.title && this.newPackage.price && this.newPackage.duration) {
      console.log('Request payload:', this.newPackage); // Debugging log
      this.agentService.addPackage(this.newPackage).subscribe({
        next: (response) => {
          console.log('Package added successfully!', response);
          this.resetForm(); // Clear the form after successful submission
        },
        error: (err) => {
          console.error('Error adding package:', err); // Log the error
        }
      });
    } else {
      console.error('Title, Price, and Duration are required fields');
    }
  }
  goBack():void {
    this.router.navigate(['/app-agent']);
  }
 
  resetForm(): void {
    this.newPackage = {
      title: '',
      duration: '', // Reset duration field
      description: '',
      price: null,
      includedServices: '',
      category: '',
      travelAgent: '',
      image: '' // Reset image field
    };
  }
   
}
 