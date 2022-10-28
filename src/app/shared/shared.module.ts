import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsHeaderComponent } from './components/posts-header/posts-header.component';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [PostsHeaderComponent, PostCardComponent],
  exports: [PostsHeaderComponent, PostCardComponent],
  imports: [CommonModule]
})
export class SharedModule {}
