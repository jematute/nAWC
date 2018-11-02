import { NgModule } from '@angular/core';
import { UiApiComponent } from './ui-api.component';
import { ToolbarService } from './toolbar/toolbar.service';

@NgModule({
  imports: [
  ],
  declarations: [UiApiComponent],
  exports: [UiApiComponent],
  providers: [ ToolbarService ]
})
export class UiApiModule { }
