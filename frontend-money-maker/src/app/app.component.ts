import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-money-maker';
  isSidebarOpen = false;

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.isSidebarOpen = false;
      }
    })
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onResize() {
    this.isSidebarOpen = false;
  } 

}
