import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from '../../Services/booking.service'; // Add Booking interface
import { PackserviceService } from '../../Services/packservice.service';
import { InsuranceserviceService } from '../../Services/insuranceservice.service'; // Correct import

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class BooknowComponent implements OnInit {
  calculatedEndDate: string | number | Date = ''; // Initialize with a default value

  bookingForm!: FormGroup;
  minDate: string;
  selectedPackage: any;
  packageId: number = 0;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private packageService: PackserviceService,
    private insuranceService: InsuranceserviceService, // Correct type
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.initializeForm();
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      startDate: ['', [Validators.required]],
      includeInsurance: [false]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const packageId = params['packageId'];
      if (packageId) {
        this.packageId = parseInt(packageId);
        this.loadPackageDetails();
      } else {
        console.error('No package ID provided');
        this.router.navigate(['/packages']);
      }
    });
  }

  loadPackageDetails(): void {
    if (!this.packageId) {
      console.error('No package ID provided');
      return;
    }

    this.packageService.getPackageById(this.packageId).subscribe({
      next: (data) => {
        console.log('Package details loaded:', data);
        // If data is an array, pick the first element
        this.selectedPackage = Array.isArray(data) ? data[0] : data;
      },
      error: (error) => {
        console.error('Error loading package:', error);
        this.router.navigate(['/packages']);
      }
    });
  }

  updateEndDate(): void {
    const startDateValue = this.bookingForm.value.startDate;

    if (startDateValue && this.selectedPackage?.duration) {
      const startDate = new Date(startDateValue);

      if (isNaN(startDate.getTime())) {
        console.error('Invalid startDate:', startDateValue);
        alert('Invalid start date. Please select a valid date.');
        this.calculatedEndDate = ''; // Reset endDate
        return;
      }

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + this.selectedPackage.duration);
      this.calculatedEndDate = endDate.toISOString(); // Ensure valid ISO string
      console.log('Calculated endDate:', this.calculatedEndDate);
    } else {
      console.error('Missing startDate or package duration');
      this.calculatedEndDate = ''; // Reset endDate
    }
  }

  onSubmit(): void {
    console.log('Form submitted', this.bookingForm.value);

    if (this.bookingForm.valid && this.selectedPackage) {
      const startDateValue = this.bookingForm.value.startDate;
      const startDate = new Date(startDateValue);

      if (isNaN(startDate.getTime())) {
        console.error('Invalid startDate:', startDateValue);
        alert('Invalid start date. Please select a valid date.');
        return;
      }

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + this.selectedPackage.duration);

      if (isNaN(endDate.getTime())) {
        console.error('Invalid endDate calculated:', endDate);
        alert('Invalid end date. Please check your input.');
        return;
      }

      const bookingData: Booking = {
        packageID: this.packageId,
        userID: Number(localStorage.getItem('userId')), 
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: 'Confirmed'
      };

      console.log('Sending booking data:', bookingData);

      this.bookingService.addBooking(bookingData).subscribe({
        next: (response: any) => {
          console.log('Booking created:', response);
          if (this.bookingForm.value.includeInsurance) {
            // Pass userID and bookingID as separate arguments
            this.insuranceService.addInsurance(bookingData.userID, response.bookingID).subscribe({
              next: () => alert('Booking Successful and insurance insured!'),
              error: () => alert('Booking successful, but insurance failed!')
            });
            
          } else {
            alert('Booking successful!');
          }
          this.router.navigate(['/app-bookings']);
        },
        error: (error: any) => {
          console.error('Booking failed:', error);
          alert(`Failed to create booking. Error: ${error.message}`);
        }
      });
    } else {
      console.log('Form validation failed');
      if (this.bookingForm) {
        console.log('Form status:', this.bookingForm.status);
        console.log('Form errors:', this.bookingForm.errors);
        console.log('Form controls:', this.bookingForm.controls);

        Object.keys(this.bookingForm.controls).forEach(key => {
          const control = this.bookingForm.get(key);
          if (control?.invalid) {
            console.log(`Control ${key} is invalid. Errors:`, control.errors);
            control.markAsTouched();
          }
        });
      }
    }
  }

  navigateToPackages(): void {
    this.router.navigate(['/packages']);
  }
  goBack() {
    this.router.navigate(['/app-packages']);
    }
}