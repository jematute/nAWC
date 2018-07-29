import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientServicesService } from './client-services.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ ClientServicesService ],
  declarations: [ ]
})
export class ClientServicesModule { }
