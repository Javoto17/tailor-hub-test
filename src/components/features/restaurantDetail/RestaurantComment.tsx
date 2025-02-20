import React from 'react';
import { Text, View } from 'react-native';

import { tv } from '@/lib/tv';
import { Review } from '@/modules/comments/domain/Comment';

import Button from '../shared/Button';
import Rating from '../shared/Rating';

interface RestaurantCommentProps {
  comment: Review;
  owner: boolean;
  onDelete: (commentId: string) => void;
}

const wrapperComment = tv({
  base: 'flex-1 gap-y-2',
  variants: {
    border: {
      true: 'pb-4 border-b border-primary',
    },
  },
});

const RestaurantComment = ({
  comment,
  owner = false,
  onDelete,
}: RestaurantCommentProps) => {
  return (
    <View className={wrapperComment({ border: true })}>
      <View className="gap-y-2">
        <View className="justify-between items-center flex-row gap-x-2">
          <Text className="text-body-small text-black font-roobert">
            {comment?.owner?.name}
          </Text>
          {owner && (
            <Button
              testID="delete-comment-button"
              icon={{ name: 'trash', size: 16 }}
              onPress={() => onDelete(comment._id)}
            />
          )}
        </View>
        <View className="justify-center items-end">
          <Rating testID="comment-rating" value={comment.rating} />
        </View>
      </View>
      <View>
        <Text className="text-body-small text-black font-roobert">
          {comment.comment}
        </Text>
      </View>
    </View>
  );
};

export default RestaurantComment;
