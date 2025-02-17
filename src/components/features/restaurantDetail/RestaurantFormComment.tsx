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

  const thisOnSubmit = (data: FormCommentData) => {
    onSubmit(data);
  };

  return (
    <View className="p-4 border rounded-2xl border-black items-start gap-y-4">
      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, value } }) => (
          <Rating value={value} onRate={onChange} />
        )}
      />
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Write your comment..."
          />
        )}
      />
      <Button
        variant="outline"
        size="small"
        onPress={handleSubmit(thisOnSubmit)}
        label="Enviar"
      />
    </View>
  );
};

export default RestaurantFormComment;
