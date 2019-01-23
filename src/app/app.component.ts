import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PluginsService } from './plugins/plugins.service';
import { LocalizationService } from 'projects/ui-api/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;


  title = 'app';
  constructor(public locale: LocalizationService, private plugins: PluginsService) {

  }

  ngOnInit() {
    this.plugins.loadPlugins().subscribe(result => {
      this.plugins.plugins.forEach(element => {
        this.content.createComponent(element);
      });
    });
  }

}
