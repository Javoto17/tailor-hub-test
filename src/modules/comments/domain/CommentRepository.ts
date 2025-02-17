import { Review } from './Comment';

export interface CommentRepository {
  createComment: (
    restaurantId: string,
    comment: string,
    rating: number
  ) => Promise<Review>;
  deleteComment: (restaurantId: string, id: string) => Promise<void>;
  updateComment: (
    restaurantId: string,
    commentId: string,
    comment: string,
    rating: number
  ) => Promise<Review>;
}
