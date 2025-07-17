import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-travel-agent',
  imports: [CommonModule],
  templateUrl: './travel-agent.component.html',
  styleUrl: './travel-agent.component.css'
})
export class TravelAgentComponent {
  name: string | null = null;
  userRole:string | null = null;
  constructor(private router: Router, private authS: AuthserviceService) {
    if (typeof window !== 'undefined' && localStorage) {
      // Access localStorage only in the browser
      this.name = localStorage.getItem('Name');
      this.userRole=localStorage.getItem('userRole');

    }
  }

  explore() {
    console.log('explore button clicked!');
    // Add your booking logic here
    this.router.navigate(['/app-agent']);
  }

  navigateToProfile() {
    console.log('Navigating to Profile');
    this.router.navigate(['/app-profile']);
  }

  navigateToBookings() {
    console.log('Navigating to My Bookings');
    this.router.navigate(['/app-bookings']);
  }

  navigateToContact() {
    console.log('Navigating to Contact Us');
    this.router.navigate(['/app-create-assistance']);
  }
  
  logout(){
    this.authS.logout();
    this.router.navigate(['']);
  }


}
