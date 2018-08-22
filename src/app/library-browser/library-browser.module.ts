import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryBrowserComponent } from './library-browser.component';
import { TreeModule } from '../tree/tree.module';
import { LibraryService } from './library.service';

@NgModule({
  imports: [
    CommonModule, TreeModule
  ],
  declarations: [LibraryBrowserComponent],
  exports: [LibraryBrowserComponent],
  providers: [LibraryService]
})
export class LibraryBrowserModule { }
