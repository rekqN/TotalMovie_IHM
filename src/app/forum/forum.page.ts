import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';
import { AlertController } from '@ionic/angular';

interface Post {
  postId: string;
  postTitle: string;
  postCreator: string;
  postContent: string;
  postComments: string;
  postViews: string;
  postDate: string;
}

interface Comment {
  commentId: string;
  commentedOnPostId: string;
  commentCreator: string;
  commentContent: string;
  commentDate: string;
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  public posts: Post[] = [];
  public comments: Comment[] = [];
  public post: Post | undefined;
  public postId: string = '';
  public newComment: string = '';
  public username: string = '';

  constructor(private route: ActivatedRoute, private storage: Storage, private alertController: AlertController) {
    this.posts = [];
    this.comments = [];
    this.postId = '';
  }

  async initializeStorage() {
    await this.storage.create();
  }

  async ionViewWillEnter() {
    await this.initializeStorage();

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

    this.storage.get('comments')
      .then((comments) => {
        if (comments) {
          this.comments = comments;
          console.log('Comentários recuperados:', this.comments);
        } else {
          console.log('Nenhum comentário encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao recuperar os comentários:', error);
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id') ?? '';
      this.fetchData();
    });

    if (ScreenOrientation.lock) {
      const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
      ScreenOrientation.lock(lockOptions);
    }
  }

  fetchData() {
    fetch('./assets/dados/forumPosts.json')
      .then(res => res.json())
      .then(json => {
        this.posts = json;
        this.post = this.posts.find(post => post.postId === this.postId);
      });
  }

  get filteredComments(): Comment[] {
    return this.comments.filter(comment => comment.commentedOnPostId === this.postId);
  }

  enviarComentario() {
    if (this.newComment.trim() !== '' && this.username.trim() !== '') {
      const novoComentario: Comment = {
        commentId: this.generateUniqueId(),
        commentedOnPostId: this.postId,
        commentCreator: this.username,
        commentContent: this.newComment,
        commentDate: new Date().toLocaleDateString()
      };

      // Adicionar o novo comentário à lista existente
      this.comments.push(novoComentario);

      console.log('Novo comentário adicionado:');
      console.log('ID:', novoComentario.commentId);
      console.log('Post ID:', novoComentario.commentedOnPostId);
      console.log('Criador:', novoComentario.commentCreator);
      console.log('Conteúdo:', novoComentario.commentContent);
      console.log('Data:', novoComentario.commentDate);

      this.updateCommentsStorage();

      this.newComment = '';

      this.presentAlert('Comentário adicionado com sucesso!');
    }
  }
    async updateCommentsStorage() {
      try {
        await this.storage.set('comments', this.comments);
        console.log('Armazenamento local atualizado com os novos comentários.');
      } catch (error) {
        console.error('Erro ao atualizar o armazenamento local:', error);
      }
    }
    
    // Gera um ID único para cada novo comentário
    generateUniqueId(): string {
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000000);
      return `${timestamp}-${randomNum}`;
    }

    async presentAlert(message: string) {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }




