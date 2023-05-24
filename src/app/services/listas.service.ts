import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Movie {
  movieId: string;
  username: string;
  tituloYear: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private verMaisTardeList: { movieId: string, username: string, tituloYear: string, imagem: string }[] = [];
  private storageInstance: Storage | null = null;
  readonly STORAGE_KEY = 'verMaisTardeList';

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    this.storageInstance = await this.storage.create();
    const storedList = await this.storageInstance.get(this.STORAGE_KEY);
    this.verMaisTardeList = storedList ? JSON.parse(storedList) : [];
  }

  adicionarVerMaisTarde(movieId: string, username: string, tituloYear: string, imagem: string) {
    const filmeExistente = this.verMaisTardeList.find(filme => filme.movieId === movieId && filme.username === username);
    if (filmeExistente) {
      console.log('O filme já está na lista "Ver mais tarde"');
    } else {
      this.verMaisTardeList.push({ movieId, username, tituloYear, imagem });
      this.saveToStorage();
      console.log('Filme adicionado à lista "Ver mais tarde":', movieId);
    }
  }

  private async saveToStorage() {
    if (this.storageInstance) {
      await this.storageInstance.set(this.STORAGE_KEY, JSON.stringify(this.verMaisTardeList));
    }
  }

  async getVerMaisTardeList(username: string): Promise<{ movieId: string, username: string, tituloYear: string, imagem: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
  
    const filmesPorUsuario = this.verMaisTardeList.filter(filme => filme.username === username);
    return filmesPorUsuario;
  }

  async getFilmesPorUsuario(username: string): Promise<{ movieId: string, username: string, tituloYear: string, imagem: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const filmes = this.verMaisTardeList.filter(filme => filme.username === username);
    return filmes;
  }

  async getUsernameFromStorage(): Promise<string> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const username = await this.getUsernameFromStorage();
    username && console.log('Username:', username);
    return username;
  }

  async removerFilmeVerMaisTarde(filme: Movie) {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const index = this.verMaisTardeList.findIndex(f => f.movieId === filme.movieId && f.username === filme.username);
    if (index > -1) {
      this.verMaisTardeList.splice(index, 1);
      await this.saveToStorage();
      console.log('Filme removido do Ionic Storage:', filme);
    }
  }
  
}
