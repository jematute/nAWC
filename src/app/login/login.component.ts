import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalizationService } from '../localization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private locale: LocalizationService,private router: Router, private authService: AuthService) { }

  private user: User = { loginName: "test1", password: ""};
  selectedValue: string;
  public languages = [];

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
    //get languages to populate dropdown
    this.locale.languages.subscribe(
      langs => { 
        this.languages = langs; 
        if (this.languages.length > 0) 
          this.selectedValue = this.languages[0].value }
    );
  }

}
