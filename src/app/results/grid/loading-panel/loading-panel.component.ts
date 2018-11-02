import { Component, OnInit } from '@angular/core';
import { GridService } from 'projects/ui-api/src';

@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styleUrls: ['./loading-panel.component.less']
})
export class LoadingPanelComponent implements OnInit {

  public loading: boolean;

  constructor(private grid: GridService) {
    grid.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit() {
  }

}
