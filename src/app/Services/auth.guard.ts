import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from '../Services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in and has the 'Admin' role
 //   const userRole = this.authService.getUserRole(); // Assuming this method exists in your AuthserviceService
 const token=localStorage.getItem('token');   
 if (token) {
      return true; // Allow access
    } else {
      this.router.navigate(['/not-authorized']); // Redirect to a "Not Authorized" page
      return false; // Block access
    }
  }
}