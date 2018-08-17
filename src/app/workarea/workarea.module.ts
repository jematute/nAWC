import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea.component';
import { WorkareaService } from './workarea.service';
import { MaterialModule } from '../material/material.module';
import { ClientServicesModule } from '../client-services/client-services.module';
import { ProgressDialogModule } from '../progress-dialog/progress-dialog.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule, ClientServicesModule, ProgressDialogModule
  ],
  declarations: [WorkareaComponent],
  exports: [ WorkareaComponent ],
  providers: [ WorkareaService, { provide: "WorkareaService", useClass: WorkareaService } ]
})
export class WorkareaModule { }
