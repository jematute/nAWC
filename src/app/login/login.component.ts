import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalizationService } from '../localization/localization.service';
import { filter } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private locale: LocalizationService,private router: Router, private authService: AuthService) { }

  private user: User = { loginName: "test1", password: ""};
  selectedLanguage: any;
  inProcess: boolean;
  autoLogin: boolean;
  appVersion: string;

  public languages = [];

  login(): void {
    this.inProcess = true;
    this.authService.login(this.user).subscribe(() => {
      
      this.router.navigate(['layout']);
    });
  }

  logout(): void {
    this.authService.something().subscribe(() => {
      console.log("Login Success");
    });
  }

  languageChanged(): void {
    this.selectedLanguage.active = true;
    this.locale.currentLanguage.next(this.selectedLanguage);
  }

  ngOnInit() {
    //get languages to populate dropdown
    this.locale.languages.subscribe(
      langs => {
        for (let lang of langs) {
          if (lang.active) {
            this.selectedLanguage = lang;
          }
        }
        this.languages = langs;
      }
    );

    this.authService.getAppVersion().subscribe(version => {
      
      this.appVersion = version.AppVersion;
    });

  }

}
