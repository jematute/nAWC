import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TreeComponent, TreeNodeComponent ],
  exports: [ TreeComponent, TreeNodeComponent ]
})
export class TreeModule { }
