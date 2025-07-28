import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService, User } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userForm!: FormGroup;
  public userID: number | null = null;
  public userList: User[] = [];
  public isEditing: boolean = false;
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  public loadUsers(): void {
    this.clearMessages();
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.userList = users;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
        this.errorMessage = 'Error loading users';
      }
    });
  }

  public editUser(user: User): void {
    this.isEditing = true;
    this.userID = user.userID!;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      contactNumber: user.contactNumber,
      role: user.role // Make sure 'role' exists on User model
    });
    this.clearMessages();
  }

  public updateUser(): void {
    if (this.userForm.valid && this.userID !== null) {
      this.clearMessages();
      this.userService.updateUser(this.userID, this.userForm.value).subscribe({
        next: () => {
          this.successMessage = 'User updated successfully';
          this.loadUsers();
          this.resetForm();
        },
        error: (error: Error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error updating user';
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  public deleteUser(userID: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userID).subscribe({
        next: () => {
          this.successMessage = 'User deleted successfully';
          this.loadUsers();
        },
        error: (error: Error) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Error deleting user';
        }
      });
    }
  }

  public resetForm(): void {
    this.clearMessages();
    this.userForm.reset();
    this.userID = null;
    this.isEditing = false;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  goBack(): void {
    this.router.navigate(['/app-admincomponent']);
  }
}
