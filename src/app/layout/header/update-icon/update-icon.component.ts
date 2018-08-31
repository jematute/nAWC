import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-icon',
  templateUrl: './update-icon.component.html',
  styleUrls: ['./update-icon.component.less']
})
export class UpdateIconComponent implements OnInit {

  constructor() { }

  iconFlash: boolean = false;

  ngOnInit() {
  }

}
