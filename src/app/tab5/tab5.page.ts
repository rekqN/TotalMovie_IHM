import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Realizador {
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  picture: {
    medium: string;
  }
}


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})

export class Tab5Page implements OnInit {

  public realizadores: Realizador[];

  constructor(public http: HttpClient) {
    this.realizadores = [];
  }

  ngOnInit(): void {
    this.http.get<any>('https://randomuser.me/api/?results=30').subscribe(data => {
      this.realizadores = data.results;
    })
  }

}
