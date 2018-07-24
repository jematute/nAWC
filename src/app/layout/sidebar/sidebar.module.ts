import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SearchModule } from '../../search/search.module';
import { ColumnsModule } from '../../columns/columns.module';
import { MaterialModule } from '../../material/material.module';
import { SidebarService } from './sidebar.service';

@NgModule({
  imports: [
    CommonModule, SearchModule, ColumnsModule, MaterialModule
  ],
  declarations: [ SidebarComponent ],
  exports: [ SidebarComponent ],
  providers: [ SidebarService ]
})
export class SidebarModule { }
