import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../layout/header/header.module';
import { SidebarModule } from '../layout/sidebar/sidebar.module';
import { LoginPromptComponent } from './login-prompt/login-prompt.component';
import { MaterialModule, ErrorDialogModule, AuthService } from 'projects/ui-api/src';

@NgModule({
    declarations: [ LoginComponent, LoginPromptComponent ],
    imports: [ CommonModule, FormsModule, MaterialModule, HeaderModule, SidebarModule, ErrorDialogModule ],
    exports: [ ],
    providers: [ AuthService ],
    entryComponents: [ LoginPromptComponent ]
})
export class LoginModule {}
