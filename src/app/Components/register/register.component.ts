import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
   registerForm!: FormGroup;
   errorMessage: string = '';
    successMessage: string = '';
    constructor(private fb: FormBuilder, private router: Router,private authS: AuthserviceService) {
  
   
   this.registerForm = this.fb.group({
     name: ['', Validators.required],
     contactNumber: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     password: ['', Validators.minLength(6)]
     });
     
    }
   
    onSubmit(): void {
      this.errorMessage = '';
      this.successMessage = '';
    
      if (this.registerForm.valid) {
        const user = {
          name: this.registerForm.get('name')?.value,
          contactNumber: this.registerForm.get('contactNumber')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value
        };
    
        console.log('Form Submitted!', user);
    
        this.authS.registerUser(user).subscribe({
          next: (response: any) => {
            console.log('Registration successful:', response);
            this.successMessage = 'Registration successful. You can now log in.';
            this.registerForm.reset();
            this.router.navigate(['']);

          },
          error: (err: any) => {
            console.error('Registration failed:', err);
            if (err.status === 409 && err.error?.error) {
              this.errorMessage = err.error.error; // backend message
            } else {
              this.errorMessage = 'Registration failed. Please try again.';
            }
          }
        });
      } else {
        this.errorMessage = 'Please fill out the form correctly.';
      }
    }
    


}
  
