import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {PostService} from './post.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Post} from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endPointURL = 'https://angular-http-v11-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointURL + 'post.json';
  @ViewChild('updateForm') form?: NgForm;
  errorSub: Subscription;
  loadedPosts = [];
  showLoading = true;
  contentKey = '';
  contentTitle = '';
  content = '';
  error = null;

  constructor(private http: HttpClient, private postService: PostService) {

  }

  ngOnInit() {
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.onCreatePost(postData);
  }

  onFetchPosts() {
    this.postService.fetchPosts();
    // Send Http request
  }


  onUpdatePost(elementRef: NgForm) {
    const post: Post ={content: '', id: '', title: ''};
    post.id = elementRef.value.key;
    post.title = elementRef.value.title;
    post.content = elementRef.value.content;
    this.postService.updatePost(post);

  }

  fetchPosts() {
    this.postService.fetchPosts().subscribe(
      posts => {
        this.showLoading = false;
        this.loadedPosts = posts;

      }
    );
  }

  onFetchPost() {
    this.fetchPosts();
  }

  onUpdateClick(postValue: Post) {
    this.contentKey = postValue.id;
    this.contentTitle = postValue.title;
    this.content = postValue.content;

  }


  onClearPosts() {
    this.showLoading = true;
    this.postService.deletePost().subscribe(
      (data) => {
        this.showLoading = false;
        this.loadedPosts = [];
      });
  }
}
