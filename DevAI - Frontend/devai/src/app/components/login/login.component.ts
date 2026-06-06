import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonInput, IonLabel, IonButton, IonText, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { HttpServices } from 'src/app/services/http-services';
import { CacheService } from 'src/app/services/cache-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonText
],

})
export class LoginComponent  implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public isLogin: boolean = true;
  

  constructor(
    private formBuilder: FormBuilder,
    private httpServices: HttpServices,
    private cacheService: CacheService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {}


  register() {
    let userInfo = this.registerForm.value;
      this.httpServices.register({
        Name: userInfo.name,
        username: userInfo.email,
        password: userInfo.password
      }).subscribe({
        next: (res) => {
          console.log('User created ✅', res);
        },
        error: (err) => {
          console.error('Error ❌', err);
        }
      });
  }

  
  login() {
    if (!this.loginForm.valid) {
     return;
    }
    let userInfo = this.loginForm.value;
    this.httpServices.login({
      username: userInfo.email,
      password: userInfo.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem(this.cacheService.userTokenKey, res.access_token);
        this.router.navigate(['/home'], {replaceUrl: true});
      },
      error: (err) => {
        console.error('Login failed ❌', err);
        alert('Login failed')
      }
    });
  }



}
