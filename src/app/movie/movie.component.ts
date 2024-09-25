import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  id = '';
  type = '';
  url = '';
  movies: any;
  movie:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    } else if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getMovieDetails();
  }
  getMovieDetails() {
    this.httpClient.get(`${this.url}`).subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
      //currently we are getting array of movies and we want only one movie through id(which is in url), that's why we are matching id of arrays and id( from url )
      let index =this.movies.findIndex((movie:any)=> 
        movie.id=this.id
      );
      if(index>-1){
        console.log("index value is:",index)
        this.movie=this.movies[index];
        // console.log('single Movie',this.movies[index]);
      }
    });
  }
}
