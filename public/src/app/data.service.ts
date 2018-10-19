import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from './movies';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private get_url: string = 'http://localhost:5000/api/getdata';
  private post_url: string = 'http://localhost:5000/api/postdata';

  
  constructor(private http: HttpClient) { }

  getData(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.get_url);
  }

  postData(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.post_url, movie, httpOptions);
  }
}
