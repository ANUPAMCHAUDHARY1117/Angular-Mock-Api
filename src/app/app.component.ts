import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  userName = 'blue';
  userId: number;
  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('/users', { userName: this.userName }).subscribe((data) => {
      console.log(data);
    });
  }

  deleteUser() {
    console.log(this.userId);
    this.http.delete(`/users/${this.userId}`).subscribe((data) => {
      console.log(data);
    });
  }

  getUserById() {
    this.http.get(`/users/${this.userId}`).subscribe((data) => {
      console.log(data);
    });
  }

  getUsers() {
    this.http.get('/users').subscribe((data) => {
      console.log(data);
    });
  }
}
