import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  private isShown: boolean;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    console.log("init error");
    this.errorService.title = "What's up!"
    
    this.errorService.change.subscribe(isShown => {
      this.isShown = isShown;
    });
  }

  toggle() {
    this.errorService.toggle();
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event);
    }
  }


}
