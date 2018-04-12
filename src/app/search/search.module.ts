import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { MaterialModule } from '../material/material.module';
import { ColumnsModule } from '../columns/columns.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsModule } from '../results/results.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule, ColumnsModule, FormsModule, ReactiveFormsModule, ResultsModule
  ],
  declarations: [ SearchboxComponent ],
  exports: [ SearchboxComponent ],
  providers: [ SearchService ]
})
export class SearchModule { }
