import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentserviceService } from '../../Services/agentservice.service';
 
@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
packages: any[] = []; // Array to hold all packages
 userRole=localStorage.getItem('userRole')
 userId= Number(localStorage.getItem('userId'));

  constructor(
    private agentService: AgentserviceService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadPackages(); // Fetch packages on component initialization
  }
 
  loadPackages(): void {
    this.agentService.getAllPackages().subscribe({
      next: (data: any[]) => {
        this.packages = data; // Assign fetched packages to the array
        localStorage.setItem('packages', JSON.stringify(this.packages)); // Store in local storage
        console.log('Fetched packages:', this.packages); // Debugging log
      },
      error: (err) => {
        console.error('Error fetching packages:', err);
      }
    });
  }
 
  navigateToUpdate(packageId: number): void {
    const packageID = packageId; // Get the package ID
    this.agentService.setPackageId(packageId);
    this.router.navigate(['/app-update-package']); // Navigate to the update page
  }
 
  navigateToDelete(packageId: number): void {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this package?')) {
      this.agentService.deletePackage(packageId).subscribe({
        next: () => {
          alert('Package deleted successfully!');
          this.loadPackages(); // Reload packages after deletion
        },
        error: (err) => {
          console.error('Error deleting package:', err);
          alert('Failed to delete package');
        }
      });
    }
  }
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-image.jpg';
  }
  navigateToReviews(packageId: number): void {
    this.agentService.setPackageId(packageId);
    localStorage.setItem('packageId', packageId.toString());
    this.router.navigate(['/app-reviews']);
  }
  goBack(): void {
    this.userRole = localStorage.getItem('userRole') || '';
    if (this.userRole === 'Admin') {
      this.router.navigate(['/app-admincomponent']);
    }
    else if (this.userRole === 'Travel Agent') {
      this.router.navigate(['/app-travel-agent']);
    } else {
      this.router.navigate(['/app-herosection']);
    }
  }
  navigateToAdd(): void {
    this.router.navigate(['/app-add']);
  }
}
 