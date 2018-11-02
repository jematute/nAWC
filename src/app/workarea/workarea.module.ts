import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea.component';
import { ClientServicesModule } from '../client-services/client-services.module';
import { MaterialModule, ProgressDialogModule, WorkareaService } from 'projects/ui-api/src';

@NgModule({
  imports: [
    CommonModule, MaterialModule, ClientServicesModule, ProgressDialogModule
  ],
  declarations: [WorkareaComponent],
  exports: [ WorkareaComponent ],
  providers: [ WorkareaService, { provide: 'WorkareaService', useClass: WorkareaService } ]
})
export class WorkareaModule { }
