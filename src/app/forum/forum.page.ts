import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Post {
  postId: number,
  postTitle: string,
  postCreator: string,
  postContent: string,
  postComments: number,
  postViews: number,
  postDate: string
}

interface Comment {
  commentId: number;
  commentedOnPostId: number;
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


  constructor(private router: Router) {
    this.posts = [];
    this.comments = [];
  }

  ngOnInit() {
    fetch('./assets/dados/forumPosts.json')
      .then(res => res.json())
      .then(json => {
        this.posts = json;
      });
    fetch('./assets/dados/forumComments.json')
      .then(res => res.json())
      .then(json => {
        this.comments = json;
      });
  }
}
