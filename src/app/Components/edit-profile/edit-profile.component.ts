import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [FormsModule,ReactiveFormsModule,CommonModule]
})
export class EditProfileComponent implements OnInit {
  userId = Number(localStorage.getItem('userId')); // Retrieve user ID from local storage

  editProfileForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authS: AuthserviceService) {}

  ngOnInit(): void {
    const name = localStorage.getItem('Name') || '';
    const email = localStorage.getItem('Email') || '';
    const contactNumber = localStorage.getItem('ContactNumber') || '';
    const password = localStorage.getItem('Password') || ''; // Optional if stored
    const role = localStorage.getItem('userRole') || 'Customer';
  
    this.editProfileForm = this.fb.group({
      name: [name, Validators.required],
      contactNumber: [contactNumber, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      password: [password, [Validators.required, Validators.minLength(6)]],
      role: [role, Validators.required]
    });
  }
  

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
      if (userId) {
        const updatedUser = {
          name: this.editProfileForm.get('name')?.value,
          contactNumber: this.editProfileForm.get('contactNumber')?.value,
          email: this.editProfileForm.get('email')?.value,
          password: this.editProfileForm.get('password')?.value,
          role: this.editProfileForm.get('role')?.value // 💥 INCLUDE THIS
        };
        

        console.log('Profile Updated!', updatedUser); // Log the request payload
        this.authS.updateUserProfile(updatedUser).subscribe({
          next: (response: any) => {
            alert('Profile updated successfully');
            this.router.navigate(['/app-profile']);
            this.authS.setUser(this.userId, response.name,response.email,response.contactNumber); 
            
          },
          error: (err: any) => {
            console.error('Profile update failed:', err);
            alert(`Profile update failed: ${err.message}`);
          }
        });
      } else {
        console.error('User ID not found in local storage');
        alert('User ID not found. Please log in again.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  goBack() {
    this.router.navigate(['/app-profile']);
    }
}
