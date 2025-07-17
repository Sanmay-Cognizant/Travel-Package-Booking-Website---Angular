import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentserviceService } from '../../Services/agentservice.service';
 
@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css']
})
export class DeletePackageComponent {
  packageId: string = ''; // Holds the package ID entered by the user
 
  constructor(private agentService: AgentserviceService) {}
 
  onDelete(): void {
    if (this.packageId) {
      const packageIdNumber = parseInt(this.packageId, 10); // Convert to number if necessary
      this.agentService.deletePackage(packageIdNumber).subscribe({
        next: (response: any) => {
          console.log('Package deleted successfully!', response);
          this.packageId = ''; // Clear the input field after deletion
        },
        error: (err: any) => {
          console.error('Error deleting package:', err);
        }
      });
    } else {
      console.error('Package ID is required');
    }
   
  }
 
}
 