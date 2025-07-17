import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../Services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  editingId: number | null = null;
  newStartDate: string = '';

  constructor(private bookingService: BookingService , private router: Router) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe(data => {
      this.bookings = data;
    });
  }

  // Helper to format date for input[type="date"]
  formatDateForInput(dateStr: string): string {
    return dateStr ? dateStr.split('T')[0] : '';
  }

  startEdit(booking: Booking) {
    this.editingId = booking.bookingID ?? null;
    this.newStartDate = this.formatDateForInput(booking.startDate);
  }

  updateBooking(booking: Booking) {
    // Calculate duration in ms between original start and end date
    const originalStart = new Date(booking.startDate);
    const originalEnd = new Date(booking.endDate);
    const durationMs = originalEnd.getTime() - originalStart.getTime();
    // Calculate new end date based on new start date and duration
    const newStart = new Date(this.newStartDate);
    const newEnd = new Date(newStart.getTime() + durationMs);

    const newStartDateISO = newStart.toISOString();
    const newEndDateISO = newEnd.toISOString();

    this.bookingService.updateBooking(booking.bookingID!, newStartDateISO, newEndDateISO).subscribe({
      next: () => {
        alert('Start date and end date updated successfully!');
        this.editingId = null;
        this.loadBookings();
      },
      error: () => {
        alert('Failed to update booking.');
      }
    });
  }

  // deleteBooking(booking: Booking) {
  //   if (confirm('Are you sure you want to delete this booking?')) {
  //     this.bookingService.deleteBooking(booking.bookingID!).subscribe({
  //       next: () => {
  //         this.loadBookings();
  //       },
  //       error: (err) => {
  //         alert('Failed to delete booking. It may have related records or does not exist.');
  //       }
  //     });
  //   }
  // }
  goBack() {
    this.router.navigate(['/app-admincomponent']);
  }
}