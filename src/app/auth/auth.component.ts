import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatButton],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  constructor(public authService: AuthService) {}

  login() {
    this.authService.login('johnd', 'm38rmF$').subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
