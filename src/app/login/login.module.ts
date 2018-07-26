import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HeaderModule } from '../layout/header/header.module';
import { SidebarModule } from '../layout/sidebar/sidebar.module';
import { ErrorDialogModule } from '../error-dialog/error-dialog.module';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';

@NgModule({
    declarations: [ LoginComponent, LoginPromptComponent ],
    imports: [ CommonModule, FormsModule, MaterialModule, HeaderModule, SidebarModule, ErrorDialogModule ],
    exports: [ ],
    providers: [ AuthService ],
    entryComponents: [ LoginPromptComponent ]
})
export class LoginModule {}