import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacardComponent } from './datacard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [DatacardComponent]
})
export class DatacardModule { }
