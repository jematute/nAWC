import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[clickToClose]'
})
export class ClickToCloseDirective {

  @Output() clickToClose = new EventEmitter();

  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  public onGlobalClick(targetElement: Array<any>) {
    if (!targetElement) {
      return;
  }

  const clickedInside = this._elementRef.nativeElement.contains(targetElement);
  if (!clickedInside) {
      console.log("emitter");
      this.clickToClose.emit(event);
  }


    // let elementRefInPath = targetElementPath.find(e => e === this._elementRef.nativeElement);

    // if (!elementRefInPath) {
    //   this.clickToClose.emit(null);
    // }
  }

}
