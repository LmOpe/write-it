import { User } from '../users/user.schemas';
import { Post } from '../posts/posts.schemas';

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