import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea.component';
import { WorkareaService } from './workarea.service';
import { MaterialModule } from '../material/material.module';
import { ClientServicesModule } from '../client-services/client-services.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule, ClientServicesModule
  ],
  declarations: [WorkareaComponent],
  exports: [ WorkareaComponent ],
  providers: [ WorkareaService ]
})
export class WorkareaModule { }
