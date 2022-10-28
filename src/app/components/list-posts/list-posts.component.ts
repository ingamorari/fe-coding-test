import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { PostsService } from '../../core/services/posts.service';
import { PostModel, UserModel } from '../../core/models/post.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit, OnDestroy {
  public postsList$ = new BehaviorSubject<PostModel[]>([]);
  public postsList: PostModel[];
  public usersListMap: Map<number, UserModel> = new Map();
  public usersList: UserModel[];

  private subs: Subscription[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.getPostsData();
  }

  private set sub(s: Subscription) {
    this.subs.push(s);
  }

  private getPostsData(): void {
    this.sub = this.postsService
      .getUsers()
      .pipe(
        tap(res => {
          this.usersList = res;
          this.usersList.forEach(el => {
            this.usersListMap.set(el.id, el);
          });
        }),
        switchMap(() => this.postsService.getPostsList())
      )
      .subscribe(res => {
        this.postsList$.next(res);
        this.postsList = res;
      });
  }

  public addEditPost(route: string): void {
    void this.router.navigate([route]);
  }

  public editPost(postID: number): void {
    void this.router.navigate(['edit/', postID]);
  }

  public deletePost(postID: number): void {
    this.sub = this.postsService.deletePost(postID).subscribe({
      next: () => {
        this.postsList = this.postsList.filter(post => post.id !== postID);
        this.postsList$.next(this.postsList);
        console.log('Success');
      },
      error: () => {
        console.log('Error');
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
