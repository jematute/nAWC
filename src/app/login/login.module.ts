import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { ErrorModule } from '../error/error.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [ LoginComponent ],
    imports: [ CommonModule, FormsModule, ErrorModule, MaterialModule ],
    exports: [ ],
    providers: [ AuthService ],
})
export class LoginModule {}