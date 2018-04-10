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
      console.log("Got columns 1"); 
    });
    this.auth.something().subscribe(columns => {
      console.log("Got columns 2"); 
    });
    this.auth.something().subscribe(columns => {
      console.log("Got columns 3"); 
    });
    this.auth.something().subscribe(columns => {
      console.log("Got columns 4"); 
    });
  } 
  ngOnInit() {
  }

}