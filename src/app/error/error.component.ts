import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  public isShown: boolean;
  public title: string;
  public content: string;

  constructor(private errorService: ErrorService) { }

  ngOnInit() { 
    this.errorService.change.subscribe(obj => {
      this.isShown = obj.shown;
      this.title = obj.title;
      this.content = obj.content;
    });
  }

  toggle() {
    this.errorService.toggle("", "");
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      console.log(event);
    }
  }


}
