import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
   loginForm: FormGroup;
   errorMessage: string = '';
  
   constructor(private fb: FormBuilder, private router: Router, private authS: AuthserviceService) {
   this.loginForm = this.fb.group({
   email: ['', [Validators.required, Validators.email]],
   password: ['', [Validators.required, Validators.minLength(6)]]
   });
   }
  
  
   onSubmit():void{
    const email=this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;
    const user = {
      email: email,
      password: password
    }
    if(user.email && user.password){
      this.authS.login(user).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            const token = response.token;
            this.authS.setToken(token);
            const decodedToken = this.authS.decodeToken();
            this.authS.setUser(decodedToken.UserID,decodedToken.Name,decodedToken.Email,decodedToken.ContactNumber);
            localStorage.setItem('userRole', decodedToken.Role);

            console.log(this.authS.getTokenExpiry());
            console.log(this.authS.getRole());
            
            if( this.authS.getRole() === 'Travel Agent') {
              alert('Travel Agent Login Successful'); 
              this.router.navigate(['/app-travel-agent']);
            }
            else if (this.authS.getRole() === 'Admin') {
              alert('Admin Login Successful');
              this.router.navigate(['/app-admincomponent']);
            }
            else {
              this.router.navigate(['/app-herosection']);
              alert('Login Successful');
            }
          } else {
            console.error('Invalid response');
          }
        },
        error: (error: any) => {
          console.error('Login failed:', error.error); // Logs "Invalid credentials."
          this.errorMessage = error.error || 'Login failed. Please try again.';
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    } else{
      alert('Invalid Form Values...');
    }
  }

  decodeToken() {
    const decodedToken = this.authS.decodeToken();
    if (decodedToken) {
      console.log('Decoded Token:', decodedToken);
      // Now you can use the information in the token
    } else {
      console.log('No token found or unable to decode');
    }
  }


   get email() {
   return this.loginForm.get('email');
   }
  
   get password() {
   return this.loginForm.get('password');
   }


  }  
  