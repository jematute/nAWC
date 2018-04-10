import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SearchModule } from '../../search/search.module';

@NgModule({
  imports: [
    CommonModule, SearchModule
  ],
  declarations: [ SidebarComponent ],
  exports: [ SidebarComponent ]
})
export class SidebarModule { }
