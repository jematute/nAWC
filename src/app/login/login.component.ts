import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  private user: User = { loginName: "", password: ""};

  public languages = [
    {value: 'EN', viewValue: 'English'},
    {value: 'FR', viewValue: 'French'},
    {value: 'GE', viewValue: 'German'}
  ];

  selectedValue = this.languages[0].value;

  login(): void {
    this.authService.login(this.user).subscribe(() => {
      this.router.navigate(['layout']);
    });
  }

  logout(): void {
    this.authService.something().subscribe(() => {
      console.log("Login Success");
    });
  }

  ngOnInit() {
  }

}
