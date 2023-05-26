import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DataService } from '../services/listas.service';


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
  public username: string = '';

  constructor(private route: ActivatedRoute, private storage: Storage, private router: Router, private dataService: DataService) {
    
  }

  ngOnInit() {
    this.storage.get('username')
    .then((username) => {
      if (username) {
        this.username = username;
        console.log('Username recuperado:', this.username);
      } else {
        console.log('Nenhum username encontrado');
      }
    })
    .catch((error) => {
      console.error('Erro ao recuperar o username:', error);
    });

    this.valorRecebido = this.route.snapshot.paramMap.get('id');
    fetch('./assets/dados/movies.json')
      .then((res) => res.json())
      .then((json) => {
        this.dataMovies = json;
        this.movie = this.dataMovies.find((movie) => movie.id === this.valorRecebido);
      });
  }

  adicionarVerMaisTarde() {
    console.log('Botão "Ver mais tarde" clicado!');
      if (this.movie) {
    this.dataService.adicionarVerMaisTarde(this.movie.id, this.username, this.movie.title_year, this.movie.img);
  } else {
    console.log('Nenhum filme selecionado');
  }
    
  }
}
