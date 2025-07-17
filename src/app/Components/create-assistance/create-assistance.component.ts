import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssistanceService, AssistanceRequest } from '../../Services/assistance.service';

@Component({
    selector: 'app-create-assistance',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-assistance.component.html',
    styleUrls: ['./create-assistance.component.css']
})
export class CreateAssistanceComponent {
  userId= Number(localStorage.getItem('userId')); // Retrieve user ID from local storage
    public assistanceData: AssistanceRequest = {
        userID: this.userId, // Set a default value or get from logged-in user
        status: 'Pending', // Default status
        issueDescription: '',
        resolutionTime: new Date().toISOString()
    };
    public successMessage: string = '';
    public errorMessage: string = '';
    userRole=''
    // ... rest of the component code remains the same
 
 
    constructor(
        private assistanceService: AssistanceService,
        private router: Router
    ) {}
 
    public onSubmit(): void {
        this.clearMessages();
        this.assistanceService.submitAssistanceRequest(this.assistanceData).subscribe({
            next: (response: AssistanceRequest) => {
                this.successMessage = 'Request submitted successfully';
                setTimeout(() => {
                    this.router.navigate(['/app-herosection']);
                }, 2000);
            },
            error: (error: Error) => {
                console.error('Error submitting request:', error);
                this.errorMessage = 'Error submitting request';
            }
        });
    }
 
    private clearMessages(): void {
        this.successMessage = '';
        this.errorMessage = '';
    }
    goBack() {
        this.userRole = localStorage.getItem('userRole') || '';
           if (this.userRole === 'Travel Agent') {
            this.router.navigate(['/app-travel-agent']);
          } else {
            this.router.navigate(['/app-herosection']);
          }
       }
}
 