import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from '../Components/Constant/constant';
import { AuthserviceService } from './authservice.service';


interface Package {
  packageId: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  includedServices: string;
  travelagent:string;
  image:string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AgentserviceService {
  //private apiUrl = 'https://localhost:7117/api/Package';
   // Replace with actual backend API
  packageId = signal<number | null>(null);
 
  // Method to set the packageId
  setPackageId(id: number): void {
    this.packageId.set(id);
  }
 
  // Method to get the current packageId
  getPackageId(): number | null {
    return this.packageId();
  }
 
  // Method to clear the packageId
  clearPackageId(): void {
    this.packageId.set(null);
  }
 
 
 constructor(private http: HttpClient,private authService: AuthserviceService) {}
  
   addPackage(packageData: Package): Observable<any> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.post<any>(`${Constant.BASE_URI}Package`, packageData,{ headers });
   }
  
   getAllPackages(): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package`,{ headers });
   }
  
   getPackageByTitle(title: string): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package/title/${title}`,{ headers });
   }
  
   getPackageById(packageId: number): Observable<Package> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package>(`${Constant.BASE_URI}Package/${packageId}`,{ headers });
   }
  
   getPackageByPriceRange(minPrice: number, maxPrice: number): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package/price-range/${minPrice}/${maxPrice}`,{ headers });
   }
  
   getPackageByDuration(duration: number): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package/duration/${duration}`,{ headers });
   }
  
   getPackageByTravelAgent(travelAgentId: number): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package/travel-agent/${travelAgentId}`,{ headers });
   }
  
   getPackageByCategory(category: string): Observable<Package[]> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.get<Package[]>(`${Constant.BASE_URI}Package/category/${category}`,{ headers });
   }
  
   updatePackage(packageId: number, updatedData: Partial<Package>): Observable<any> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     return this.http.put<any>(`${Constant.BASE_URI}Package/${packageId}`, updatedData,{ headers });
   }
  
   deletePackage(packageId: number): Observable<any> {
     const token = this.authService.getToken();  
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
     return this.http.delete<any>(`${Constant.BASE_URI}Package/${packageId}`,{ headers });
   }
}
 
 