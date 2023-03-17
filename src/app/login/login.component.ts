import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  type: string="password";
  isText: boolean= false;
  eyeIcon: string="fa-eye-slash";
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe({
      next:(res=>{
        const user = res.find((a:any)=> {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if(user){
          this.toast.success({detail:"SUCCESS", summary:"Login successful!!!", duration: 5000})
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        } else {
          this.validateAllFormFields(this.loginForm);
          this.toast.error({detail:"ERROR", summary:"Something went wrong!!!", duration: 5000})
        }
      })
      ,error:(err=>{
        alert("Something went wrong!!!");
      })
    })
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
  
}
