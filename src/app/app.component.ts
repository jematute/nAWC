import { Component, OnInit } from '@angular/core';
import { PluginsService } from './plugins/plugins.service';
import { LocalizationService } from 'projects/ui-api/src';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public locale: LocalizationService, private plugins: PluginsService) {

  }

  ngOnInit() {
    this.plugins.loadPlugins();
  }

}
