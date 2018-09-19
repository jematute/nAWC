import { NgModule } from '@angular/core';
import { AdeptApiComponent } from './adept-api.component';
import { AdeptApiService } from './adept-api.service';
import { ToolbarService } from './toolbar/toolbar.service';

@NgModule({
  imports: [
  ],
  declarations: [AdeptApiComponent],
  exports: [AdeptApiComponent],
  providers: [ AdeptApiService, ToolbarService ]
})
export class AdeptApiModule { }
