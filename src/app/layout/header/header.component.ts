import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/auth/models/User';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userObservable$!: Observable<User | null>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userObservable$ = this.authService.userObservable$;
  }

  logout(): void {
    this.authService.logout();
  }

}
