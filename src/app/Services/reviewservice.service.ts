import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
 
export interface Review {
  reviewID: number;
  packageID: number;
  userID: number;
  rating: number;
  comment: string;
  timeStamp: Date;
  foodReview?: number;
  flightReview?: number;
  hotelReview?: number;
  travelAgentReview?: number;
}
 
export interface NewReview {
  packageID: number;
  userID: number;
  rating: number;
  comment: string;
  timeStamp: Date;
  foodReview?: number;
  flightReview?: number;
  hotelReview?: number;
  travelAgentReview?: number;
}
 
@Injectable({
  providedIn: 'root'
})
export class ReviewserviceService {
 
  private apiUrl = 'https://localhost:7117/api/Review'; 
 
  constructor(private http: HttpClient) {}
 
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`);
  }
 
  addReview(review: Partial<Review>): Observable<Review> {
    const reviewData = {
      ...review,
      timeStamp: new Date().toISOString(),
      foodReview: review.foodReview || null,
      flightReview: review.flightReview || null,
      hotelReview: review.hotelReview || null,
      travelAgentReview: review.travelAgentReview || null
    };
 
    return this.http.post<Review>(this.apiUrl, reviewData).pipe(
      tap(response => console.log('Review added:', response)),
      catchError(error => {
        console.error('Error adding review:', error);
        throw error;
      })
    );
  }
 
 
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reviewId}`);
}
 
  getReviewsByPackageId(packageId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/package/${packageId}`);
  }
 
 
}
 
 