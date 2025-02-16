type Reviews = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  avgRating: number;
  reviews: Reviews[];
};
