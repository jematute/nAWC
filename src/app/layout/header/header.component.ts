import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) { }
  getColumns(): void {
    this.auth.something().subscribe(columns => {
      console.log(columns); 
    });
  } 
  ngOnInit() {
  }

}