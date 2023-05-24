import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/listas.service';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.filmesVerMaisTarde = this.dataService.getVerMaisTardeList();
    console.log('Filmes "Ver mais tarde":', this.filmesVerMaisTarde);
  }
}
