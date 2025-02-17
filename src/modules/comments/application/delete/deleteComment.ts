import { CommentRepository } from '../../domain/CommentRepository';

export const deleteComment =
  (commentsRepository: CommentRepository) =>
  async (restaurantId: string, commentId: string) => {
    return await commentsRepository.deleteComment(restaurantId, commentId);
  };
