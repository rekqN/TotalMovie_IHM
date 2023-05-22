import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.page.html',
  styleUrls: ['./filme.page.scss'],
})
export class FilmePage implements OnInit {

  public valorRecebido : any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.valorRecebido = this.route.snapshot.paramMap.get('id');
  }

}
