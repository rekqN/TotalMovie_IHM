import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Movies {
  [key: string]: {
    id: string;
    title_year: string;
    imdb_rating: string;
    genre: string;
    duration: string;
    synopsis: string;
    channel: string;
    img: string;
    big_img: string;
    video: string;
  };
}

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {
  public dataMovies: Movies = {};

  constructor() { }

  ngOnInit() {
  }
  
  Pesquisa(){

  }
}
