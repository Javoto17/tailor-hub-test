import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { CommentRepository } from '../domain/CommentRepository';
import { Review } from '../domain/Comment';

const API_URL = process.env.API_URL;

export const generateCommentRepository = (
  clientRepository: ClientRepository
): CommentRepository => {
  return {
    createComment: async (restaurantId, comment, rating) => {
      try {
        const { data } = await clientRepository.post<Review>(
          API_URL + `restaurant/${restaurantId}/comment`,
          {
            comment,
            rating,
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteComment: async (restaurantId: string, commentId: string) => {
      try {
        await clientRepository.remove(
          API_URL + `restaurant/${restaurantId}/comment/${commentId}`
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateComment: async (
      restaurantId: string,
      commentId: string,
      comment: string,
      rating: number
    ) => {
      try {
        const { data } = await clientRepository.put<Review>(
          API_URL + `restaurant/${restaurantId}/comment/${commentId}`,
          {
            comment,
            rating,
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};
