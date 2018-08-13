import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryPickerComponent } from './library-picker.component';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';

@NgModule({
  imports: [
    CommonModule, TreeModule
  ],
  declarations: [LibraryPickerComponent]
})
export class LibraryPickerModule { }
