import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { MaterialModule } from '../material/material.module';
import { ColumnsModule } from '../columns/columns.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsModule } from '../results/results.module';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import { FTSSearchService } from './ftssearch.service';

@NgModule({
  imports: [
    CommonModule, MaterialModule, ColumnsModule, FormsModule, ReactiveFormsModule, ResultsModule, CustomDirectivesModule
  ],
  declarations: [ SearchboxComponent ],
  exports: [ SearchboxComponent ],
  providers: [ { provide: "SearchService", useClass: SearchService }, SearchService, { provide: "FTSSearchService", useClass: FTSSearchService }, FTSSearchService ]
})
export class SearchModule { }
