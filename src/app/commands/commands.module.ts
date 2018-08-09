import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInService } from './check-in.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ CheckInService, MaterialModule ]
})
export class CommandsModule { }
