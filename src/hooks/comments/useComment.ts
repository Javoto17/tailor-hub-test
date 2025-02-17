import { generateCommentRepository } from '../../modules/comments/infrastructure/CommentRepository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';

import { createComment } from '@/modules/comments/application/create/createComment';
import { updateComment } from '@/modules/comments/application/update/updateComment';
import { deleteComment } from '@/modules/comments/application/delete/deleteComment';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const commentRepository = generateCommentRepository(clientRepository);

export function useComment() {
  const queryClient = useQueryClient();

  // Create Comment
  const createCommentMutation = useMutation({
    mutationFn: (newComment: {
      restaurantId: string;
      comment: string;
      rating: number;
    }) =>
      createComment(commentRepository)(
        newComment.restaurantId,
        newComment.comment,
        newComment.rating
      ),
    onSuccess: (_, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({
        queryKey: [`restaurant-detail`, restaurantId],
      });
    },
  });

  // Update Comment
  const updateCommentMutation = useMutation({
    mutationFn: (updatedComment: {
      restaurantId: string;
      commentId: string;
      comment: string;
      rating: number;
    }) =>
      updateComment(commentRepository)(
        updatedComment.restaurantId,
        updatedComment.commentId,
        updatedComment.comment,
        updatedComment.rating
      ),
    onSuccess: (_, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({
        queryKey: [`restaurant-detail`, restaurantId],
      });
    },
  });

  // Delete Comment
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: { restaurantId: string; commentId: string }) =>
      deleteComment(commentRepository)(
        commentId.restaurantId,
        commentId.commentId
      ),
    onSuccess: (_, { restaurantId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({
        queryKey: [`restaurant-detail`, restaurantId],
      });
    },
  });

  return {
    createComment: createCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
}
