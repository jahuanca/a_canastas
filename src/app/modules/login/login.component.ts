import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from 'src/app/models/auth';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  auth:Auth= new Auth();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if(this.validateForm.status == 'VALID'){
      this.signIn();
    }
  }

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      alias: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  signIn(): void{
    this.authService.postAuth(this.auth)
      .subscribe( res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.router.navigateByUrl('/personal-vehiculo');
      }, err => {});
  }

}
