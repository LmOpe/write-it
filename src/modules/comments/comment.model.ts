import { User } from '../users/user.schema';
import { Post } from '../posts/posts.model';

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    post: Post;
    parentComment?: Comment;
    replies?: Comment[];
}