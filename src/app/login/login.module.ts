import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { ErrorModule } from '../error/error.module';

@NgModule({
    declarations: [ LoginComponent ],
    imports: [ CommonModule, FormsModule, ErrorModule ],
    exports: [ LoginComponent ],
    providers: [ AuthService ],
})
export class LoginModule {}