import { CommentRepository } from '../../domain/CommentRepository';

export const createComment =
  (commentsRepository: CommentRepository) =>
  async (restaurantId: string, comment: string, rating: number) => {
    const createdComment = await commentsRepository.createComment(
      restaurantId,
      comment,
      rating
    );

    if (!createdComment) {
      throw new Error('Comment could not be created');
    }

    return createdComment;
  };
