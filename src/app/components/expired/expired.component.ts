import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expired',
  imports: [],
  templateUrl: './expired.component.html',
  styleUrl: './expired.component.scss'
})
export class ExpiredComponent {


  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']).catch(err => console.error('Navigation error:', err));
  }


}
