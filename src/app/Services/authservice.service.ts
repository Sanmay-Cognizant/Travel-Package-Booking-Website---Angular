import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { catchError, Observable } from 'rxjs';
import { of } from 'rxjs';
import { Constant } from '../Components/Constant/constant';
import { jwtDecode } from 'jwt-decode';

interface user {
  email: string;  
  password: string;
}
interface newUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}
interface AdminUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { 
   
  }

  login(userData: user): Observable<any> {
    return this.http.post(Constant.BASE_URI + Constant.LOGIN, userData);
  }

  
  getToken(): string | null  {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
  // New method to decode the token and another method to extract tokens exp
  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token); // Decode the token and return its payload
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }
  getTokenExpiry(): Date | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      // Convert the exp value from Unix timestamp to a Date object
      const expiryDate = new Date(decodedToken.exp * 1000); // Multiply by 1000 to convert seconds to milliseconds
      return expiryDate;
    }
    return null;
  }
  getRole(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.Role) {
      const userrole= decodedToken.Role;
      
      return userrole;
    }
    return null;
  }

getTotalUsers(): Observable<any> {
 const token = this.getToken();
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}User`, { headers });
 }
getPackages(): Observable<any> {
 const token = this.getToken();  
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}Package`, { headers }); 
}
getBookings(): Observable<any> {
 const token = this.getToken();
 const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 return this.http.get(`${Constant.BASE_URI}Booking`, { headers });
}
registerUser(NewuserData: newUser): Observable<any> {   
    return this.http.post(`${Constant.BASE_URI+Constant.Register}`, NewuserData);
}
updateUserProfile(userData: any): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const userId = Number(localStorage.getItem('userId'));
  return this.http.put(`${Constant.BASE_URI}User/${userId}`, userData, { headers });
}

registerAdminUser(AdminuserData: AdminUser): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`${Constant.BASE_URI}Auth/admin/register`, AdminuserData, { headers }); 
}  
  setUser(userId:number,Name:string,Email:string,ContactNumber:string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('Name', Name);
      localStorage.setItem('Email', Email);
      localStorage.setItem('ContactNumber', ContactNumber);
    }
  }
  getUser(): { userId: number; Name: string; Email: string; ContactNumber: string } | null {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      const Name = localStorage.getItem('Name');
      const Email = localStorage.getItem('Email');
      const ContactNumber = localStorage.getItem('ContactNumber');

      if (userId && Name && Email && ContactNumber) {
        return {
          userId: parseInt(userId, 10),
          Name,
          Email,
          ContactNumber
        };
      }
    }
    return null;
  }
  removeUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
      localStorage.removeItem('Name');
      localStorage.removeItem('Email');
      localStorage.removeItem('ContactNumber');
      localStorage.removeItem('userRole');

    }
  }
  getUsersByRole(role: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}User/admin/users-by-role?role=${role}`, { headers });
  }
  getReviews(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Review`, { headers });
  }
  getBookingsByUserId(userId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Constant.BASE_URI}Booking/user/${userId}`, { headers });
  }
  cancelbooking(bookingId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${Constant.BASE_URI}Booking/cancel/${bookingId}`, { headers });
  }
  logout(): void {
    this.removeToken();
    this.removeUser();
  }
 
}
