import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  public movies = [];
  // public results = [];
  // public cleanResults = [];
  constructor(private data:DataService) { }

  ngOnInit() {
    this.data.getData()
    .subscribe((data) => {
      this.movies = data;
    });
  
  }
  
  // userInput(input){
  //   for(let i = 0; i < this.movies.length; i++){ 
  //     if(this.movies[i].name.includes(input)){
  //       this.results.push(this.movies[i]);
  //     } 
  //   }
  //   this.cleanData();
  // }

  // cleanData(){
  //   this.cleanResults = this.results.filter(function(item, pos, self) {
  //     return self.indexOf(item) == pos;
  //   })
  //   console.log(this.cleanResults);
  // }
}
