import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';

interface Post {
    postId: string,
    postTitle: string,
    postCreator: string,
    postContent: string,
    postComments: string,
    postViews: string,
    postDate: string
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})

export class Tab5Page implements OnInit {
  public posts: Post[] = [];
  public allPosts: Post[] = [];
  public searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    fetch('./assets/dados/forumPosts.json')
      .then(res => res.json())
      .then(json => {
        this.posts = json;
        this.allPosts = json;
      });
      if (ScreenOrientation.lock) {
        const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(lockOptions);
      }  
  }
  redirecionarPost(post: Post) {
    console.log("se estas a ler isto e pq esta a funcionar. parabens!");
    this.router.navigate(['/forum', post.postId]);
  }

  filterPosts() {
    const query = this.searchQuery.toLowerCase();
    this.posts = this.allPosts.filter(post => post.postTitle.toLowerCase().includes(query));
  }
}
