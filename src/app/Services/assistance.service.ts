import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';



export interface AssistanceRequest {  
  requestID?: number;
  userID: number;
  status: string;
  issueDescription: string;
  resolutionTime: string;
}
 
@Injectable({
    providedIn: 'root'
})
export class AssistanceService {
    private apiUrl = 'https://localhost:7117/api/Assistance';
 
    constructor(private http: HttpClient,private authService: AuthserviceService) { }
 
    // Create new assistance request
    submitAssistanceRequest(request: AssistanceRequest): Observable<AssistanceRequest> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<AssistanceRequest>(this.apiUrl, request, { headers });
    }
 
    // Get all assistance requests
    getAllAssistanceRequests(): Observable<AssistanceRequest[]> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
        return this.http.get<AssistanceRequest[]>(this.apiUrl, { headers });
    }
 
    // Get assistance request by ID
    getAssistanceById(id: number): Observable<AssistanceRequest> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<AssistanceRequest>(`${this.apiUrl}/${id}`, { headers });
    }
 
    // Update assistance request
    updateAssistanceRequest(id: number, request: AssistanceRequest): Observable<AssistanceRequest> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<AssistanceRequest>(`${this.apiUrl}/${id}`, request, { headers });
    }
 
    // Delete assistance request
    deleteAssistanceRequest(id: number): Observable<void> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
 
    // Update assistance status
    updateStatus(id: number, status: string): Observable<AssistanceRequest> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.patch<AssistanceRequest>(`${this.apiUrl}/${id}/status`, { status }, { headers });
    }
}
 