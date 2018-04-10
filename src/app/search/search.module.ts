import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ SearchboxComponent ],
  exports: [ SearchboxComponent ],
  providers: [ SearchService ]
})
export class SearchModule { }
