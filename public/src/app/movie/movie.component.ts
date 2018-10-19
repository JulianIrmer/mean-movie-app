import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movies = [];
  public results = [];
  public cleanResults = [];

  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getData()
      .subscribe((data) => {
        this.movies = data;
        this.cleanResults = data;
      });
  }

  userInput(input){
    this.results = [];
    for(let i = 0; i < this.movies.length; i++){ 
      if(this.movies[i].title.includes(input) || //check for name
        (this.movies[i].year.toString().includes(input) && input.length == 4 )|| //check year, exclude rating
         this.movies[i].rating.toString().charAt(0).includes(input) || //check rating
         this.movies[i].director.includes(input)|| //check director
         this.movies[i].stars.includes(input)){ //check stars
        this.results.push(this.movies[i]);
      } 
    }
    this.cleanData();
  }

  //Delete double entries and return clean array
  cleanData(){
    this.cleanResults = this.results.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
  }

  sort(type){
    if(type == 'Name'){
      this.cleanResults.sort((a, b) => a.title.localeCompare(b.title));  
    }
    if(type == 'Year'){
      this.cleanResults.sort((a, b) => a.year.toString().localeCompare(b.year.toString()));  
    }
    if(type == 'Rating'){
      this.cleanResults.sort((b, a) => a.rating.toString().localeCompare(b.rating.toString()));  
    }
  }
}
