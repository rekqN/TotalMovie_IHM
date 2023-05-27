import { Component } from '@angular/core';
import { DataService, Movie } from '../services/listas.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  public filmesVerMaisTarde: Movie[] = [];
  public username: string = '';

  constructor(
    private dataService: DataService,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    this.storage
      .get('username')
      .then((username) => {
        if (username) {
          this.username = username;
          console.log('Username recuperado:', this.username);
          this.carregarFilmesVerMaisTarde();
        } else {
          console.log('Nenhum username encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar o username:', error);
      });
  }

  async carregarFilmesVerMaisTarde() {
    try {
      this.filmesVerMaisTarde = await this.dataService.getVerMaisTardeList(this.username);
      console.log('Filmes "Ver mais tarde":', this.filmesVerMaisTarde);
    } catch (error) {
      console.error('Erro ao obter os filmes "Ver mais tarde":', error);
    }
  }

  async removerFilme(filme: Movie) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: `Deseja remover o filme da lista?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Remoção cancelada');
          },
        },
        {
          text: 'Remover',
          handler: async () => {
            try {
              await this.dataService.removerFilmeVerMaisTarde(filme);
              console.log('Filme removido:', filme);
              await this.carregarFilmesVerMaisTarde(); // Atualiza a exibição dos filmes
            } catch (error) {
              console.error('Erro ao remover o filme:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async adicionarFilmeVerMaisTarde(movieId: string, tituloYear: string, imagem: string) {
    try {
      await this.dataService.adicionarVerMaisTarde(movieId, this.username, tituloYear, imagem);
      console.log('Filme adicionado à lista "Ver mais tarde"');
      await this.carregarFilmesVerMaisTarde(); // Atualiza a exibição dos filmes
    } catch (error) {
      console.error('Erro ao adicionar o filme:', error);
    }
  }
}


