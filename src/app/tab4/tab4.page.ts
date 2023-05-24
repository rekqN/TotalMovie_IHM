import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/listas.service';
import { Storage } from '@ionic/storage-angular';

interface Movie {
  movieId: string;
  username: string;
  tituloYear: string;
  imagem: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public filmesVerMaisTarde: Movie[] = [];
  public username: string = '';

  constructor(private dataService: DataService,  private storage: Storage) { }

  ngOnInit() {
    this.storage.get('username')
      .then((username) => {
        if (username) {
          this.username = username;
          console.log('Username recuperado:', this.username);
          this.dataService.getVerMaisTardeList(this.username)
            .then((filmes) => {
              this.filmesVerMaisTarde = filmes;
              console.log('Filmes "Ver mais tarde":', this.filmesVerMaisTarde);
            })
            .catch((error) => {
              console.error('Erro ao obter os filmes "Ver mais tarde":', error);
            });
        } else {
          console.log('Nenhum username encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar o username:', error);
      });
  }

  removerFilme(filme: Movie) {
    const index = this.filmesVerMaisTarde.indexOf(filme);
    if (index > -1) {
      this.filmesVerMaisTarde.splice(index, 1);
      console.log('Filme removido:', filme);
      
    }
  }
}

