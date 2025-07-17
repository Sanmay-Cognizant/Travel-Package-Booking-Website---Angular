import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    
    const userRole = this.authService.getRole(); 
    if (userRole === 'Admin') {
      return true; // Allow access
    } else {
      this.router.navigate([' ']); // Redirect to a "Not Authorized" page
      return false; // Block access
    }
  }
}