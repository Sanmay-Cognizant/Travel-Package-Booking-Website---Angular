import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Review, ReviewserviceService } from '../../Services/reviewservice.service';
import { UserService } from '../../Services/user.service';
 
interface HoverStates {
  overall: number;
  food: number;
  flight: number;
  hotel: number;
  travelAgent: number;
}
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
 
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  reviewForm: FormGroup;
  loading = false;
  error: string | null = null;
  currentPackageId: number | null = null;
  router: any;
  showReviewForm: boolean = false;
  starsArray: number[] = [1, 2, 3, 4, 5];
  averageRating: number = 0;
  hoverRating: number = 0;
  hoverStates: { [key: string]: number } = {
    overall: 0,
    food: 0,
    flight: 0,
    hotel: 0,
    travelAgent: 0
  };
 
  newReview = {
    rating: 0,
    comment: '',
    foodReview: 0,
    flightReview: 0,
    hotelReview: 0,
    travelAgentReview: 0
  };
  userRole: string | null = localStorage.getItem('userRole');
 userMap: { [key: number]: string } = {};
 
  constructor(
    private reviewService: ReviewserviceService,
    private fb: FormBuilder,
    private location: Location,
    private userService: UserService,
  ) {
    this.reviewForm = this.initializeForm();
    this.loadPackageIdFromStorage();
  }
 
  private loadPackageIdFromStorage(): void {
    const storedPackageId = localStorage.getItem('packageId');
    if (storedPackageId) {
      this.currentPackageId = parseInt(storedPackageId, 10);
      this.loadReviewsByPackageId(this.currentPackageId);
    }
  }
 
  private initializeForm(): FormGroup {
    return this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required]],
      foodReview: [null, [Validators.min(1), Validators.max(5)]],
      flightReview: [null, [Validators.min(1), Validators.max(5)]],
      hotelReview: [null, [Validators.min(1), Validators.max(5)]],
      travelAgentReview: [null, [Validators.min(1), Validators.max(5)]]
    });
  }
 
  ngOnInit(): void {
  if (this.currentPackageId) {
    this.loadReviewsByPackageId(this.currentPackageId);
  }

  this.loadUserNames();
}

loadUserNames(): void {
  this.userService.getBasicUserInfo().subscribe({
    next: (users) => {
      this.userMap = {};
      for (const user of users) {
        this.userMap[user.userID] = user.name;
      }
    },
    error: (err) => {
      console.error('Failed to load user names:', err);
    }
  });
}
 
  calculateAverageRating(): void {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
  }
 
  generateStars(rating: number): string[] {
    return Array(5).fill('★').map((star, index) =>
      index < rating ? '★' : '☆'
    );
  }
 
  setRating(type: string, rating: number): void {
    switch(type) {
      case 'overall':
        this.reviewForm.get('rating')?.setValue(rating);
        break;
      case 'food':
        this.reviewForm.get('foodReview')?.setValue(rating);
        break;
      case 'flight':
        this.reviewForm.get('flightReview')?.setValue(rating);
        break;
      case 'hotel':
        this.reviewForm.get('hotelReview')?.setValue(rating);
        break;
      case 'travelAgent':
        this.reviewForm.get('travelAgentReview')?.setValue(rating);
        break;
    }
  }
 
 
  setHoverRating(type: string, rating: number): void {
    if (type === 'overall') {
      this.hoverRating = rating;
    } else {
      this.hoverStates[type as keyof HoverStates] = rating;
    }
  }
 
  clearHoverRating(type: string): void {
    if (type === 'overall') {
      this.hoverRating = 0;
    } else {
      this.hoverStates[type as keyof HoverStates] = 0;
    }
  }
 
  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }
 
  // Update existing loadReviewsByPackageId method
  loadReviewsByPackageId(packageId: number) {
    this.loading = true;
    this.reviewService.getReviewsByPackageId(packageId).subscribe({
      next: (data: any) => {
        this.reviews = data;
        this.calculateAverageRating();
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load reviews';
        this.loading = false;
        console.error(err);
      }
    });
  }
 
  onSubmit(): void {
    
    if (this.reviewForm.valid && this.currentPackageId) {
      try {
        const review: Partial<Review> = {
          packageID: this.currentPackageId,
          userID: Number(localStorage.getItem('userId')) || 1,
          rating: Number(this.reviewForm.value.rating),
          comment: this.reviewForm.value.comment,
          timeStamp: new Date(), // Convert to ISO string
          foodReview: this.reviewForm.value.foodReview ? Number(this.reviewForm.value.foodReview) : undefined,
          flightReview: this.reviewForm.value.flightReview ? Number(this.reviewForm.value.flightReview) : undefined,
          hotelReview: this.reviewForm.value.hotelReview ? Number(this.reviewForm.value.hotelReview) : undefined,
          travelAgentReview: this.reviewForm.value.travelAgentReview ? Number(this.reviewForm.value.travelAgentReview) : undefined
        };
   
        console.log('Submitting review:', review);
   
        this.reviewService.addReview(review).subscribe({
          next: (response: any) => {
            console.log('Review added successfully:', response);
            alert('Review submitted successfully!');
            this.reviewForm.reset();
            this.loadReviewsByPackageId(this.currentPackageId!);
          },
          error: (err:any) => {
            console.error('Error adding review:', err);
            this.error = err.error?.message || 'Failed to add review';
          }
        });
      } catch (err) {
        console.error('Error preparing review data:', err);
        this.error = 'Failed to prepare review data';
      }
    }
  }
 
  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.loading = true;
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          alert('Review deleted successfully!');
          if (this.currentPackageId) {
            this.loadReviewsByPackageId(this.currentPackageId);
          }
          this.loading = false;
        },
        error: (err:any) => {
          this.error = 'Failed to delete review';
          this.loading = false;
          console.error('Delete error:', err);
        }
      });
    }
  }
 
  clearError(): void {
    this.error = null;
  }
  goBack(): void {
    this.location.back();
  }
}
 
