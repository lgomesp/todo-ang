import { Component } from '@angular/core';

import { UserService } from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-ang';

  constructor(public user: UserService)  {

  }
}
