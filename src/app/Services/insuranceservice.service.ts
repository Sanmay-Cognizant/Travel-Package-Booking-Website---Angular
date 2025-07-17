import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Insurance {
  insuranceID?: number;
  userID: number;
  bookingID: number;
  coverageDetails: string;
  provider: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsuranceserviceService {
  private apiUrl = 'https://localhost:7117/api/Insurance';
  userID = Number(localStorage.getItem('userId')) || 1; // Set user ID dynamically

  constructor(private http: HttpClient) {}

  addInsurance(userID: number, bookingID: number): Observable<Insurance> {
    // Add other fields if required by backend, or make them optional in backend
    return this.http.post<Insurance>(`${this.apiUrl}`, {
      UserID: userID,
      BookingID: bookingID
      // CoverageDetails, Provider, Status can be omitted if set server-side
    });
  }

  getAllInsurances(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.apiUrl}/all`);
  }

  updateInsuranceStatus(insuranceID: number, status: string): Observable<Insurance> {
    return this.http.put<Insurance>(`${this.apiUrl}/update-status/${insuranceID}`, { status });
  }

  deleteInsurance(insuranceID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${insuranceID}`);
  }

  getInsurancesByUserId(userID: number): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.apiUrl}/user/${userID}`);
  }

  getInsuranceByProvider(provider: string): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${this.apiUrl}/provider/${provider}`);
  }

  getTotalInsuranceCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}