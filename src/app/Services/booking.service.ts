import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthserviceService } from './authservice.service';


export interface Booking {
  bookingID?: number;
  userID: number;
  packageID: number;
  startDate: string;
  endDate: string;
  status: string;
  paymentID?: number;
  insurances?: any[];
  user?: any;
  payment?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://localhost:7117/api/Booking';

  constructor(private http: HttpClient , private authService: AuthserviceService) {}

  addBooking(booking: Booking): Observable<any> {
    booking.userID = Number(localStorage.getItem('userId')) || 1; // Set user ID dynamically
    return this.http.post<any>(this.apiUrl, booking).pipe(
      catchError((error) => {
        console.error('Error adding booking:', error);
        return throwError(() => error);
      })
    );
  }
  getAllBookings(): Observable<Booking[]> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Booking[]>(this.apiUrl,{headers});
  }

  updateBooking(id: number, startDate: string, endDate: string): Observable<any> {
    const token = this.authService.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.put(`${this.apiUrl}/${id}`, { startDate, endDate },{headers});
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}