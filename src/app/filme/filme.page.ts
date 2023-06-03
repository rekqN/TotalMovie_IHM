import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/listas.service';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  public linkAnterior: string = '';
  public safeVideoUrl: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private alertController: AlertController,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.storage
      .get('username')
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
        if (this.movie) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.video);
        }
      });

    if (ScreenOrientation.lock) {
      const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
      ScreenOrientation.lock(lockOptions);
    }
  }

  voltar() {
    history.back();
  }

  async adicionarVerMaisTarde() {
    console.log('Botão "Ver mais tarde" clicado!');
    if (this.movie) {
      try {
        const filmeExistente = await this.dataService.verificarFilmeExistente(this.movie.id, this.username);
        if (filmeExistente) {
          this.presentAlert('Filme/série existente', 'O filme/série já está na lista "Ver mais tarde".');
        } else {
          await this.dataService.adicionarVerMaisTarde(
            this.movie.id,
            this.username,
            this.movie.title_year,
            this.movie.img
          );
          this.presentAlert('Filme/série adicionado', 'O filme/série foi adicionado à lista "Ver mais tarde".');
        }
      } catch (error) {
        console.error('Erro ao adicionar o filme:', error);
      }
    } else {
      console.log('Nenhum filme selecionado');
    }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

