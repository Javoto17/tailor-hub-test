import { CommentRepository } from '../../domain/CommentRepository';

export const updateComment =
  (commentsRepository: CommentRepository) =>
  async (
    restaurantId: string,
    commentId: string,
    comment: string,
    rating: number
  ) => {
    const updatedComment = await commentsRepository.updateComment(
      restaurantId,
      commentId,
      comment,
      rating
    );

    if (!updatedComment) {
      throw new Error('Comment could not be updated');
    }

    return updatedComment;
  };
