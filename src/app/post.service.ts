import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  errorHandling = new Subject<any>();
  error = null;
  endPointURL: string = 'https://angular-http-v11-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointURL + 'post.json';

  constructor(private http: HttpClient) {
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post(this.postURL, postData).subscribe(
      (data) => {
        console.log(data);
      }, error => {
        this.errorHandling.next(error);
      }
    );

  }

  fetchPosts(){
    let customParam = new HttpParams();
    customParam = customParam.append('print', 'pretty');
    return this.http.get<{[key: string]: Post}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header'
      }),
      params: customParam,
      responseType: 'json'
    }).pipe(
      map(responseData => {
        const postArray = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key});
          }
        }
        return postArray;
      })
    );
  }

  updatePost(postData : Post){
    let data = {[postData.id]: { title: postData.title, content: postData.content }};

    this.http.patch(this.postURL, data).subscribe(
      (data) => {
        console.log(data);
      }
    );

  }

  deletePost(){
    return this.http.delete(this.postURL);
  }

}
