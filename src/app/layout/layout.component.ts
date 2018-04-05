import { Component } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  public items = [{ title: 'Profile' }, { title: 'Log out' }];
}
