import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.less'],
})
export class TreeNodeComponent implements OnInit {

  constructor() { }

  private _item = {};

  @Output() onSelected = new EventEmitter<any>();
  @Input() set item(item) {
    this._item = item;
  };

  get item() {
    return this._item;
  }
  
  ngOnInit() {

  }

  itemSelected(item) {
    this.onSelected.next(item);
  }

  toggle(item) {
    item.expanded = !item.expanded;
  }

}
