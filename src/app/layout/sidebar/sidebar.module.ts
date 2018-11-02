import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SearchModule } from '../../search/search.module';
import { ColumnsModule } from '../../columns/columns.module';
import { SidebarService } from './sidebar.service';
import { CustomDirectivesModule } from '../../custom-directives/custom-directives.module';
import { WorkareaModule } from '../../workarea/workarea.module';
import { LibraryBrowserModule } from '../../library-browser/library-browser.module';
import { MaterialModule } from 'projects/ui-api/src';

@NgModule({
  imports: [
    CommonModule, SearchModule, ColumnsModule, MaterialModule, CustomDirectivesModule, WorkareaModule, LibraryBrowserModule
  ],
  declarations: [ SidebarComponent ],
  exports: [ SidebarComponent ],
  providers: [ SidebarService ]
})
export class SidebarModule { }
