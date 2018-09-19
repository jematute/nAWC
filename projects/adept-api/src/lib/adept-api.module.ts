import { NgModule } from '@angular/core';
import { AdeptApiComponent } from './adept-api.component';
import { AdeptApiService } from './adept-api.service';

@NgModule({
  imports: [
  ],
  declarations: [AdeptApiComponent],
  exports: [AdeptApiComponent],
  providers: [ AdeptApiService ]
})
export class AdeptApiModule { }
