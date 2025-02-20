import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import Button from '../shared/Button';
import Rating from '../shared/Rating';
import TextArea from '../shared/TextArea';

export interface FormCommentData {
  restaurantId: string;
  comment: string;
  rating: number;
}

interface RestaurantFormCommentProps {
  onSubmit: (data: FormCommentData) => void;
}

const RestaurantFormComment: React.FC<RestaurantFormCommentProps> = ({
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<FormCommentData>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });

  return (
    <View className="p-4 border rounded-2xl border-black items-start gap-y-4">
      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, value } }) => (
          <Rating testID="rating-input" value={value} onRate={onChange} />
        )}
      />
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            testID="comment-input"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Write your comment..."
          />
        )}
      />
      <Button
        testID="submit-comment-button"
        variant="outline"
        size="small"
        onPress={handleSubmit(onSubmit)}
        label="Enviar"
      />
    </View>
  );
};

export default RestaurantFormComment;
