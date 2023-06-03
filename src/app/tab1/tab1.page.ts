import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';

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

interface GenreGroup {
  genre: string;
  movies: Movie[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public dataMovies: Movie[] = [];
  public username: string = '';
  public groupedMovies: GenreGroup[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); 
    if (ScreenOrientation.lock) {
      const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
      ScreenOrientation.lock(lockOptions);
    }

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

    fetch('./assets/dados/movies.json')
      .then((res) => res.json())
      .then((json) => {
        this.dataMovies = json;
        this.groupMoviesByGenre();
      });
  }

  groupMoviesByGenre() {
    const groupedMovies: GenreGroup[] = [];
    this.dataMovies.forEach((movie) => {
      const existingGroup = groupedMovies.find((group) => group.genre === movie.genre);
      if (existingGroup) {
        existingGroup.movies.push(movie);
      } else {
        groupedMovies.push({ genre: movie.genre, movies: [movie] });
      }
    });
    this.groupedMovies = groupedMovies;
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Sair da conta',
      message: 'Tem a certeza que deseja encerrar a sessão?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.storage.remove('username')
      .then(() => {
        console.log('Logout realizado');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erro ao realizar logout:', error);
      });
  }

  redirecionarFilme(movie: Movie) {
    // Redirecionar para a página 'filme' com o ID do filme como parâmetro na URL
    this.router.navigate(['/filme', movie.id]);
  }
  
}
