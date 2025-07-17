import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; // Import NavigationEnd
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from "./Components/login/login.component";
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, LoginComponent, CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travel Package Booking System';
  showLogin: boolean = true;


  constructor(private router: Router) {

    // Listen to route changes and filter for NavigationEnd events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLogin = this.router.url !== '/app-herosection';
        
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide login form on specific routes
        this.showLogin = event.url === '/login';
      }
    });
  }

}