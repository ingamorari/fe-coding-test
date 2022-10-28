import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { PostModel, UserModel } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnChanges {
  @Input() public post: PostModel;
  @Input() public usersListMap: Map<number, UserModel>;
  @Output() editPost = new EventEmitter<number>();
  @Output() deletePost = new EventEmitter<number>();

  public currentUser: UserModel | undefined;

  ngOnChanges(): void {
    this.currentUser = this.usersListMap.get(this.post.user_id);
  }

  public onEdit(postID: number): void {
    this.editPost.emit(postID);
  }

  public onDelete(postID: number): void {
    this.deletePost.emit(postID);
  }
}
