import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;
  userSurname: string | null = null;
  userEmail: string | null = null;
  userImageProf: string | null = null;
  constructor() {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const actUser = user.user;

      this.userId = actUser.id;
      this.userName = actUser.nome;
      this.userSurname = actUser.cognome;
      this.userEmail = actUser.email;
      this.userImageProf = actUser.imageProf;
    }
  }
}
