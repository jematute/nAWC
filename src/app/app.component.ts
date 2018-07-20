import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './localization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  constructor(private locale: LocalizationService) {

  }

  ngOnInit() {
    this.locale.getLanguages();
  }

}
