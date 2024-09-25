import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  trendingMovies: any;
  theaterMovies: any;
  popularMovies: any;

  constructor(private httpClient: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getMoviesInTheater();
    this.getPopularMovies();
  }

  getTrendingMovies() {
    this.httpClient
      .get('http://localhost:4200/assets/data/popular-movies.json')
      .subscribe((data) => {
        this.trendingMovies = data;
        console.log(this.trendingMovies);
      });
  }
  getMoviesInTheater() {
    this.httpClient
      .get('http://localhost:4200/assets/data/theatre-movies.json')
      .subscribe((data) => {
        this.theaterMovies = data;
        console.log(this.theaterMovies);
      });
  }
  getPopularMovies() {
    this.httpClient
      .get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe((data) => {
        this.popularMovies = data;
        console.log(this.popularMovies);
      });
  }
  goToMovie(type: string, id: string) {
      this.router.navigate(['movie',type,id]);
  }
}
