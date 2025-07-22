import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-herosection',
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HerosectionComponent implements AfterViewInit, OnDestroy {
  name: string | null = null;
  private currentSlide = 0;
  private slides: NodeListOf<Element> | null = null;
  private indicators: NodeListOf<Element> | null = null;
  private slideInterval: any;

  constructor(private router: Router, private authS: AuthserviceService) {
    if (typeof window !== 'undefined' && localStorage) {
      this.name = localStorage.getItem('Name');
    }
  }

  ngAfterViewInit() {
    // Initialize slideshow after view is loaded
    setTimeout(() => {
      this.slides = document.querySelectorAll('.slide');
      this.indicators = document.querySelectorAll('.indicator');
      this.startSlideshow();
    }, 100);
  }

  ngOnDestroy() {
    // Clean up interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideshow() {
    if (this.slides && this.indicators) {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    }
  }

  nextSlide() {
    if (this.slides && this.indicators) {
      this.slides[this.currentSlide].classList.remove('active');
      this.indicators[this.currentSlide].classList.remove('active');
      
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      
      this.slides[this.currentSlide].classList.add('active');
      this.indicators[this.currentSlide].classList.add('active');
    }
  }

  setSlide(index: number) {
    if (this.slides && this.indicators && index >= 0 && index < this.slides.length) {
      this.slides[this.currentSlide].classList.remove('active');
      this.indicators[this.currentSlide].classList.remove('active');
      
      this.currentSlide = index;
      
      this.slides[this.currentSlide].classList.add('active');
      this.indicators[this.currentSlide].classList.add('active');

      // Reset the interval to prevent immediate slide change
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
        this.startSlideshow();
      }
    }
  }

  // Your existing methods
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
  
  logout() {
    this.authS.logout();
    this.router.navigate(['']);
  }
}
