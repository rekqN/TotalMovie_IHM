import { Component, OnInit } from '@angular/core';

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
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {
  public dataMovies: Movie[] = [];
  public termoBusca: string = '';

  constructor() {}

  ngOnInit() {
    this.carregarDadosMovies();
  }

  carregarDadosMovies() {
    fetch('./assets/data/movies.json')
      .then((response) => response.json())
      .then((json) => {
        this.dataMovies = json;
        console.log('Dados dos filmes carregados:', this.dataMovies);
      })
      .catch((error) => {
        console.error('Erro ao carregar dados dos filmes:', error);
      });
  }

  pesquisar() {
    if (this.termoBusca) {
      const termo = this.termoBusca.toLowerCase();

      const filmesEncontrados = this.dataMovies.filter((movie) =>
        movie.title_year.toLowerCase().includes(termo)
      );

      if (filmesEncontrados.length > 0) {
        console.log('Correspondências encontradas! Filmes:', filmesEncontrados);
        // Faça o que deseja com os filmes encontrados
      } else {
        console.log('Nenhum filme encontrado.');
      }
    } else {
      console.log('Digite um termo de busca.');
    }
  }
}
