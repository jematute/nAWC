import { Component, OnInit } from '@angular/core';
import { User } from './user'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalizationService } from '../localization/localization.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { MatDialog } from '@angular/material';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    public locale: LocalizationService, 
    private router: Router, 
    private authService: AuthService, 
    private errorDialog: ErrorDialogService,
    private loginPrompt: MatDialog
  ) 
  { }

  public user: User = { loginName: "creator6", password: ""};
  selectedLanguage: any;
  inProcess: boolean;
  autoLogin: boolean;
  appVersion: string;

  public languages = [];

  login(force: boolean = false): void {
    this.inProcess = true;
    this.authService.login(this.user, force).subscribe(() => {
      this.router.navigate(['layout']);
    }, error => {
      this.inProcess = false;
      if (error.error) {
        if (error.error.error === "user_loggedin") {
          const dialogRef = this.loginPrompt.open(LoginPromptComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result)
              this.login(true);
          });
          return;
        }
      }
      console.log(error);     
      this.errorDialog.showError("Incorrect Login", error);
      return;
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
