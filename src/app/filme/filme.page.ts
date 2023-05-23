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
    img: string;
    big_img: string;
    video: string;
  };
};

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})

export class FilmePage implements OnInit {

  public valorRecebido : any;
  public dataMovies: Movies;

  constructor(private route: ActivatedRoute) { 
    this.dataMovies = {}
  }

  ngOnInit() {
    this.valorRecebido = this.route.snapshot.paramMap.get('id');
    fetch('./assets/dados/movies.json')
    .then(res => res.json())
    .then(json => {
      this.dataMovies = json;
    });

  }

}
