import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../Services/authservice.service';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {

  bookings: any[] = [];
  userId = Number(localStorage.getItem('userId'));

  constructor(private router: Router, private authS: AuthserviceService) {}

  ngOnInit() {
    this.getBookings();
  }

  goBack() {
    this.router.navigate(['/app-herosection']);
  }

  getBookings(): void {
    this.authS.getBookingsByUserId(this.userId).subscribe(data => {
      // ✅ Only confirmed bookings are shown (assuming backend filters cancelled ones)
      this.bookings = data.sort((a: any, b: any) => b.bookingID - a.bookingID);
      console.log(data);
    });
  }

  CancelBooking(bookingId: number): void {
    if (confirm('Are you sure you want to cancel this Booking?')) {
      this.authS.cancelbooking(bookingId).subscribe(
        response => {
          console.log('Booking cancelled successfully', response);
          alert('Booking cancelled successfully');
          this.getBookings(); // ✅ Refresh the bookings list
        },
        error => {
          console.error('Error cancelling booking', error);
          alert('Cancellation failed: ' + error.error);
        }
      );
    }
  }

  isAtLeastSevenDaysAway(startDate: string): boolean {
    const today = new Date();
    const bookingDate = new Date(startDate);

    today.setHours(0, 0, 0, 0);
    bookingDate.setHours(0, 0, 0, 0);

    const differenceInTime = bookingDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays >= 7;
  }
}
