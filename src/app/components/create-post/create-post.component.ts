import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../core/services/posts.service';
import { UserModel } from '../../core/models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  public users: UserModel[];
  public form: FormGroup = new FormGroup({});
  private postID: string | null;

  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postID = this.route.snapshot.paramMap.get('postID');
    if (this.postID) {
      this.getPostData(Number(this.postID));
    }
    this.initForm();
    this.sub = this.postsService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  private set sub(s: Subscription) {
    this.subs.push(s);
  }

  private initForm(): void {
    this.form = this.fb.group({
      user_id: [''],
      title: [''],
      body: ['']
    });
  }

  private getPostData(postID: number): void {
    this.sub = this.postsService.getPostDetails(postID).subscribe(data => {
      if (data) {
        this.form.patchValue(data);
      }
    });
  }

  public onSubmit(): void {
    if (this.postID) {
      this.sub = this.postsService.updatePost(this.form.value, Number(this.postID)).subscribe({
        next: () => {
          void this.router.navigate(['']);
        },
        error: () => {
          console.log('Error');
        }
      });
    } else {
      this.sub = this.postsService.createPost(this.form.value).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
