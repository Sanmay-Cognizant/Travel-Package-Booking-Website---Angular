import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentserviceService } from '../../Services/agentservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  styleUrls: ['./update-package.component.css']
})
export class UpdatePackageComponent implements OnInit {
  updateForm: FormGroup;
  packageId: number;
  loading=false;
  error:string |null= null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private agentService: AgentserviceService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      includedServices: ['', Validators.required],
      category: ['', Validators.required],
      travelagent: [0, Validators.required],
      image: ['', Validators.required]
    });
    this.packageId = 0;
  }

  ngOnInit(): void {
    this.packageId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPackage();
  }

  fetchPackage(): void {
    this.agentService.getPackageById(this.packageId).subscribe({
      next: (data) => {
        this.updateForm.patchValue(data); // Populate the form with package data
      },
      error: (err) => {
        console.error('Error fetching package:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedPackage = { ...this.updateForm.value, packageID: this.packageId };
      this.agentService.updatePackage(this.packageId, updatedPackage).subscribe({
        next: () => {
          alert('Package updated successfully!');
          this.router.navigate(['/app-agent']);
        },
        error: (err) => {
          console.error('Error updating package:', err);
          alert('Failed to update package. Please check the data and try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
  goBack(): void {
    this.router.navigate(['/app-agent']);
  }
}
