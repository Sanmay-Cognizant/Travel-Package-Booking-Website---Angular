import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistanceService, AssistanceRequest } from '../../Services/assistance.service';
import { Router } from '@angular/router';
 
@Component({
    selector: 'app-assistance',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {
    public assistanceData: AssistanceRequest = {
        userID: Number(localStorage.getItem('userId')) || 1,
        status: 'Pending',
        issueDescription: '',
        resolutionTime: new Date().toISOString()
    };
    public assistanceList: AssistanceRequest[] = [];
    public isEditing: boolean = false;
    public selectedId: number | null = null;
    public successMessage: string = '';
    public errorMessage: string = '';
    public showForm: boolean = false;
    public statusOptions: string[] = ['Pending', 'In Progress', 'Resolved'];
 
    constructor(private assistanceService: AssistanceService, private router:Router) {}
 
    ngOnInit(): void {
        this.loadAssistanceRequests();
    }
 
    public onSubmit(): void {
        if (this.isEditing && this.selectedId) {
            this.updateRequest();
        } else {
            this.createRequest();
        }
    }
 
    public loadAssistanceRequests(): void {
        this.clearMessages();
        this.assistanceService.getAllAssistanceRequests().subscribe({
            next: (requests: AssistanceRequest[]) => {
                this.assistanceList = requests;
            },
            error: (error: Error) => {
                console.error('Error loading requests:', error);
                this.errorMessage = 'Error loading assistance requests';
            }
        });
    }
 
    public getStatusClass(status: string): string {
        switch(status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'in progress':
                return 'status-in-progress';
            case 'resolved':
                return 'status-resolved';
            default:
                return '';
        }
    }
 
    public createRequest(): void {
        this.clearMessages();
        const newRequest = {
            ...this.assistanceData,
            status: 'Pending'
        };
       
        this.assistanceService.submitAssistanceRequest(newRequest).subscribe({
            next: (response: AssistanceRequest) => {
                this.successMessage = 'Request submitted successfully';
                this.loadAssistanceRequests();
                this.resetForm();
            },
            error: (error: Error) => {
                console.error('Error submitting request:', error);
                this.errorMessage = 'Error submitting request';
            }
        });
    }
   
 
   
    public deleteRequest(id: number): void {
        if (confirm('Are you sure you want to delete this request?')) {
            this.assistanceService.deleteAssistanceRequest(id).subscribe({
                next: () => {
                    this.successMessage = 'Request deleted successfully';
                    this.loadAssistanceRequests();
                },
                error: (error: Error) => {
                    console.error('Error deleting request:', error);
                    this.errorMessage = 'Error deleting request';
                }
            });
        }
    }
 
    public resetForm(): void {
        this.clearMessages();
        this.assistanceData = {
            userID: 1,
            status: 'Pending',
            issueDescription: '',
            resolutionTime: new Date().toISOString()
        };
        this.isEditing = false;
        this.selectedId = null;
        this.showForm = false;
    }
   
   
    // Update the editRequest method
public editRequest(request: AssistanceRequest): void {
    this.isEditing = true;
    this.selectedId = request.requestID!;
    this.assistanceData = {
        userID: request.userID,
        requestID: request.requestID,
        status: request.status,
        issueDescription: request.issueDescription,
        resolutionTime: request.resolutionTime
    };
    this.showForm = true;
    this.clearMessages();
}
 
// Update the updateRequest method
public updateRequest(): void {
    if (this.selectedId) {
        this.clearMessages();
        const updatedRequest: AssistanceRequest = {
            requestID: this.selectedId,
            userID: this.assistanceData.userID,
            status: this.assistanceData.status, // This should now properly update
            issueDescription: this.assistanceData.issueDescription,
            resolutionTime: new Date().toISOString()
        };
       
        this.assistanceService.updateAssistanceRequest(this.selectedId, updatedRequest).subscribe({
            next: () => {
                this.successMessage = 'Request updated successfully';
                this.loadAssistanceRequests();
                this.resetForm();
                this.showForm = false;
            },
            error: (error: Error) => {
                console.error('Error updating request:', error);
                this.errorMessage = 'Error updating request';
            }
        });
    }
 
    }
 
    private clearMessages(): void {
        this.successMessage = '';
        this.errorMessage = '';
    }

    goBack() {
        this.router.navigate(['/app-admincomponent']);
    }
}
 