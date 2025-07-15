import { User } from '../users/user.schema';
import { Comment } from '../comments/comment.model';

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    comments?: Comment[];
}