import { Component, OnInit } from '@angular/core';
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
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {
  public dataMovies: Movie[] = [];
  public termoBusca: string = '';
  public filmesEncontrados: Movie[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDadosMovies();
  }

  carregarDadosMovies() {
    fetch('./assets/dados/movies.json')
      .then((response) => response.json())
      .then((json) => {
        // Verifica se o JSON é um array
        if (Array.isArray(json)) {
          this.dataMovies = json;
          console.log('Dados dos filmes carregados:', this.dataMovies);
        } else {
          console.error('O arquivo JSON não contém um array de filmes.');
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar dados dos filmes:', error);
      });
  }

  pesquisar() {
    console.log(this.dataMovies);
    if (this.termoBusca) {
      const termo = this.termoBusca.toLowerCase();

      // Verifica se this.dataMovies é um array antes de usar a função filter
      if (Array.isArray(this.dataMovies)) {
        this.filmesEncontrados = this.dataMovies.filter((movie) =>
          movie.title_year.toLowerCase().includes(termo)
        );

        if (this.filmesEncontrados.length > 0) {
          console.log('Correspondências encontradas! Filmes:', this.filmesEncontrados);
        } else {
          console.log('Nenhum filme encontrado.');
        }
      } else {
        console.error('this.dataMovies não é um array de filmes.');
      }
    } else {
      console.log('Digite um termo de busca.');
    }
  }

  redirecionarFilme(movie: Movie) {
    // Redirecionar para a página 'filme' com o ID do filme como parâmetro na URL
    this.router.navigate(['/filme', movie.id]);
  }
}