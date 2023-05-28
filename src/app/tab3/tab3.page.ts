import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';

interface Movie {
id: string;
title_year: string;
imdb_rating: string;
genre: string;
duration: string;
synopsis: string;
channel: string;
img: string;
big_img: string;
video: string;
}

@Component({
selector: 'app-tab3',
templateUrl: 'tab3.page.html',
styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
public dataMovies: Movie[] = [];

constructor(private alertController: AlertController, private router: Router, private route: ActivatedRoute) {}

ngOnInit() {
fetch('./assets/dados/movies.json')
.then((res) => res.json())
.then((json) => {
this.dataMovies = json;
this.shuffleMovies();
});
if (ScreenOrientation.lock) {
    const lockOptions: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(lockOptions);
  }
}


shuffleMovies() {
for (let i = this.dataMovies.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[this.dataMovies[i], this.dataMovies[j]] = [this.dataMovies[j], this.dataMovies[i]];
}
}

redirecionarFilme(movie: Movie) {
// Redirecionar para a página 'filme' com o ID do filme como parâmetro na URL
this.router.navigate(['/filme', movie.id]);
}



}
