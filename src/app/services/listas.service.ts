import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private verMaisTardeList: { movieId: string, username: string, tituloYear: string, imagem: string }[] = [];

  constructor() { }

  adicionarVerMaisTarde(movieId: string, username: string, tituloYear: string, imagem: string) {
    this.verMaisTardeList.push({ movieId, username, tituloYear, imagem });
    console.log('Filme adicionado à lista "Ver mais tarde":', movieId);
  }

  getVerMaisTardeList() {
    return this.verMaisTardeList;
  }
}