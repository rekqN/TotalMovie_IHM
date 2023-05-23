import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  selector: 'app-tab3',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public dataMovies: Movie[] = [];

  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    fetch('./assets/dados/movies.json')
      .then((res) => res.json())
      .then((json) => {
        this.dataMovies = json;
      });
  }

  redirecionarFilme(movie: Movie) {
    // Redirecionar para a página 'filme' com o ID do filme como parâmetro na URL
    this.router.navigate(['/filme', movie.id]);
  }
}

