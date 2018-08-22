import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {

  constructor() { }

  _items = [];
  @Input() expandFirstParents = false;
  @Output() onSelected = new EventEmitter<any>();

  @Input() set items(items) {
    if (items)
      Array.from(items).forEach(item => {
        item["expanded"] = this.expandFirstParents;
      });
    this._items = items;
  }

  get items() {
    return this._items;
  }

  itemSelected(item) {
    this.onSelected.next(item);
    if (this._items) {
      this._items.forEach(node => this.deselectItem(node));
      item.selected = true;
    }    
  }

  deselectItem(item) {
    item.selected = false;
    if (item.children)
      Array.from(item.children).forEach(child => this.deselectItem(child));
  }

  ngOnInit() {
    
  }

}
