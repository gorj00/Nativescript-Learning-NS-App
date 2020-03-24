import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
// import { Router } from '@angular/router';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

// constructor(private router: Router) { }
// wrapper around Angular router
  constructor(private router: RouterExtensions) { }

//   onSignIn() {
//       // Creates new stack of pages
//     this.router.navigate(['/today'], { clearHistory: true });
//   }

  ngOnInit(): void {
  }

}
