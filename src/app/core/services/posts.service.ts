import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostModel, UserModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  public get url(): string {
    return environment.api_url;
  }

  public getPostsList(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.url}/posts`);
  }

  public getPostDetails(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.url}/posts/${postId}`);
  }

  public updatePost(post: PostModel, postId: number): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.url}/posts/${postId}`, post);
  }

  public createPost(post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>(`${this.url}/posts`, post);
  }

  public deletePost(postId: number): Observable<PostModel> {
    return this.http.delete<PostModel>(`${this.url}/posts/${postId}`);
  }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.url}/users`);
  }
}
