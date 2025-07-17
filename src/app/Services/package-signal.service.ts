import { Injectable, signal } from '@angular/core';
 
 
@Injectable({
  providedIn: 'root'
})
export class PackageSignalService {
  packageId = signal<number | null>(null);
 
  setPackageId(id: number): void {
    this.packageId.set(id);
  }
 
  getPackageId(): number | null {
    return this.packageId();
  }
 
  clearPackageId(): void {
    this.packageId.set(null);
  }
  reviewId = signal<number | null>(null);
 
  setreviewId(id: number): void {
    this.reviewId.set(id);
  }
 
  getreviewId(): number | null {
    return this.reviewId();
  }
 
  clearreviewId(): void {
    this.reviewId.set(null);
  }
}
 