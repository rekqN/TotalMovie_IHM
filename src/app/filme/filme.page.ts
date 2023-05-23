import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Movie {
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
}

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {
  public valorRecebido: any;
  public movie: Movie | undefined;
  public dataMovies: Movie[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.valorRecebido = this.route.snapshot.paramMap.get('id');
    fetch('./assets/dados/movies.json')
      .then((res) => res.json())
      .then((json) => {
        this.dataMovies = json;
        this.movie = this.dataMovies.find((movie) => movie.id === this.valorRecebido);
      });
  }
}
