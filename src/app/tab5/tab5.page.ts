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

  constructor(private router: Router) {}

  ngOnInit() {
    fetch('./assets/dados/forumPosts.json')
      .then(res => res.json())
      .then(json => {
        this.posts = json;
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
}
