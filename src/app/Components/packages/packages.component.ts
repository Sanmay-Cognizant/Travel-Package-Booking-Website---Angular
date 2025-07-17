import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackserviceService } from '../../Services/packservice.service'; // Import the service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-packages',
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
 
  packages: any[] = []; // List of all packages
  filteredPackages: any[] = []; // Filtered packages based on user input
  filters: any = {}; // Object to store filter criteria
  sidebarOpen = false; // State to toggle the sidebar
  selectedPackage: any | null = null; // Currently selected package for detailed view
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private packservice: PackserviceService // Inject the service
  ) {}
 
  ngOnInit() {
    this.loadPackages(); // Fetch packages on initialization
 
    this.route.queryParams.subscribe(params => {
      const startDate = params['startDate'];
      const duration = parseInt(params['duration'], 10);
      const destination = params['destination'];
 
      // Filter packages based on query parameters
      this.filteredPackages = this.packages.filter(pkg =>
        (!duration || pkg.duration === duration) &&
        (!destination || pkg.title.toLowerCase().includes(destination.toLowerCase()))
      );
    });
  }
 
  loadPackages() {
    // Fetch all packages from the service
    this.packservice.getAllPackages().subscribe({
      next: (data: any[]) => {
        this.packages = data;
        this.filteredPackages = data; // Initialize filteredPackages with all packages
      },
      error: (err) => {
        console.error('Error fetching packages:', err);
      }
    });
  }
 
  applyFilters() {
    // Apply filters to the packages
    this.filteredPackages = this.packages.filter(pkg =>
      (!this.filters.title || pkg.title.toLowerCase().includes(this.filters.title.toLowerCase())) &&
      (!this.filters.price || pkg.price === parseInt(this.filters.price, 10)) &&
      (!this.filters.category || pkg.category?.toLowerCase().includes(this.filters.category.toLowerCase())) &&
      (!this.filters.Duration || pkg.duration === parseInt(this.filters.Duration, 10))
    );
  }
 
  toggleSidebar() {
    // Toggle the sidebar visibility
    this.sidebarOpen = !this.sidebarOpen;
  }
 
  goBack() {
    // Navigate back to the booking page
    this.router.navigate(['/app-herosection']);
  }
 
  bookNow(packages: any) {
    if (packages && packages.packageID) { // Use the correct property name (packageID)
      // Navigate to the booking component with the package ID as a query parameter
      this.router.navigate(['/app-booknow'], { queryParams: { packageId: packages.packageID } });
    } else {
      console.error('Package ID is missing or invalid:', packages);
    }
  }
 
  toggleDetails(packages: any) {
    // Toggle the detailed view of a package
    if (this.selectedPackage === packages) {
      this.selectedPackage = null; // Collapse details if already selected
    } else {
      this.selectedPackage = packages; // Show details for the selected package
    }
  }
 
  closeDetails() {
    // Close the detailed view
    this.selectedPackage = null;
  }
 
  getPackagesByCategory(category: string) {
    // Fetch packages by category using the service
    this.packservice.getPackageByCategory(category).subscribe({
      next: (data: any[]) => {
        console.log('Packages in category:', data);
      },
      error: (err) => {
        console.error('Error fetching packages by category:', err);
      }
    });
  }
 
  updatePackage(packageId: number, updatedData: any) {
    // Update a package using the service
    this.packservice.updatePackage(packageId, updatedData).subscribe({
      next: (response) => {
        console.log('Package updated:', response);
      },
      error: (err) => {
        console.error('Error updating package:', err);
      }
    });
  }
 
  deletePackage(packageId: number) {
    // Delete a package using the service
    this.packservice.deletePackage(packageId).subscribe({
      next: (response) => {
        console.log('Package deleted:', response);
        this.loadPackages(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting package:', err);
      }
    });
  }
  navigateToReviews(packageId: number): void {
    this.packservice.getPackageById(packageId);
    localStorage.setItem('packageId', packageId.toString());
    this.router.navigate(['/app-reviews']);
  }
}
 