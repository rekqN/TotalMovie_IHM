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

  // Inicializa o armazenamento e carrega a lista de "Ver mais tarde" se existir
  private async initStorage() {
    this.storageInstance = await this.storage.create();
    const storedList = await this.storageInstance.get(this.STORAGE_KEY);
    this.verMaisTardeList = storedList ? JSON.parse(storedList) : [];
  }

  // Adiciona um filme à lista "Ver mais tarde"
  adicionarVerMaisTarde(movieId: string, username: string, tituloYear: string, imagem: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const filmeExistente = this.verMaisTardeList.find(filme => filme.movieId === movieId && filme.username === username);
      if (filmeExistente) {
        console.log('O filme já está na lista "Ver mais tarde"');
        resolve();
      } else {
        this.verMaisTardeList.push({ movieId, username, tituloYear, imagem });
        this.saveToStorage()
          .then(() => {
            console.log('Filme adicionado à lista "Ver mais tarde":', movieId);
            resolve();
          })
          .catch(error => {
            console.error('Erro ao salvar no armazenamento:', error);
            resolve();
          });
      }
    });
  }

  // Salva a lista "Ver mais tarde" no armazenamento
  private async saveToStorage() {
    if (this.storageInstance) {
      await this.storageInstance.set(this.STORAGE_KEY, JSON.stringify(this.verMaisTardeList));
    }
  }

  // Obtém a lista de filmes "Ver mais tarde" de um usuário específico
  async getVerMaisTardeList(username: string): Promise<{ movieId: string, username: string, tituloYear: string, imagem: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
  
    const filmesPorUsuario = this.verMaisTardeList.filter(filme => filme.username === username);
    return filmesPorUsuario;
  }

  // Obtém a lista de filmes de um usuário específico
  async getFilmesPorUsuario(username: string): Promise<{ movieId: string, username: string, tituloYear: string, imagem: string }[]> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const filmes = this.verMaisTardeList.filter(filme => filme.username === username);
    return filmes;
  }

  // Obtém o nome de usuário do armazenamento
  async getUsernameFromStorage(): Promise<string> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const username = await this.storageInstance?.get('username');
    username && console.log('Username:', username);
    return username;
  }
  
  // Remove um filme da lista "Ver mais tarde"
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
  
  // Verifica se um filme já existe na lista "Ver mais tarde" de um usuário específico
  async verificarFilmeExistente(movieId: string, username: string): Promise<boolean> {
    if (!this.storageInstance) {
      await this.initStorage();
    }
    const filmeExistente = this.verMaisTardeList.some(filme => filme.movieId === movieId && filme.username === username);
    return filmeExistente;
  }
}
