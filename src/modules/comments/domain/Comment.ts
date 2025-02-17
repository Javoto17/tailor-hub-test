export type Review = {
  _id: string;
  owner: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};
