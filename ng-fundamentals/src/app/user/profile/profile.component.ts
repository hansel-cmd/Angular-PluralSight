import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let firstName = new FormControl(this.authService.currentUser?.firstName, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]);
    let lastName = new FormControl(this.authService.currentUser?.lastName, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]);
    this.profileForm = new FormGroup({ firstName, lastName });
  }

  handleUpdate(formValue: { firstName: string; lastName: string }) {
    if (formValue.firstName && formValue.lastName) {
      this.authService
        .updateCurrentUser(formValue.firstName, formValue.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved');
        });
    }
  }

  validateFirstName() {
    return (
      this.profileForm.controls['firstName'].valid ||
      this.profileForm.controls['firstName'].untouched
    );
  }

  validateLastName() {
    return (
      this.profileForm.controls['lastName'].valid ||
      this.profileForm.controls['lastName'].untouched
    );
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  handleLogOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login'])
    });
  }
}
