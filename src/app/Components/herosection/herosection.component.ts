import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-herosection',
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HerosectionComponent {
  name: string | null = null;

  constructor(private router: Router, private authS: AuthserviceService) {
    if (typeof window !== 'undefined' && localStorage) {
      this.name = localStorage.getItem('Name');
    }
  }

  explore() {
    console.log('explore button clicked!');
    this.router.navigate(['/app-packages']);
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
