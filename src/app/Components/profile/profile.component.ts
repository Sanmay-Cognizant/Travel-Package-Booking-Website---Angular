import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Output() backToHero = new EventEmitter<void>();

  user = {
    username: localStorage.getItem('Name'),
    email: localStorage.getItem('Email'),
    phone: localStorage.getItem('ContactNumber'),

  };
  userRole=''
  constructor(private authService: AuthserviceService, private router: Router) {

  }
   


 goBack() {
  this.userRole = localStorage.getItem('userRole') || '';
     if (this.userRole === 'Travel Agent') {
      this.router.navigate(['/app-travel-agent']);
    } else {
      this.router.navigate(['/app-herosection']);
    }
 }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  editProfile() {
    // Logic to edit profile
    console.log('Edit Profile clicked');
    this.router.navigate(['/app-edit-profile']);
  }

}
