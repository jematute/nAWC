import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SearchModule } from '../../search/search.module';
import { ColumnsModule } from '../../columns/columns.module';

@NgModule({
  imports: [
    CommonModule, SearchModule, ColumnsModule
  ],
  declarations: [ SidebarComponent ],
  exports: [ SidebarComponent ],
})
export class SidebarModule { }
