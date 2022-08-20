import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ReviewInterface } from '../../interfaces';
import { DefaultReviewFields } from '../../data';


export interface ReviewsState {
  data: ReviewInterface[],
  current: ReviewInterface,
}

const initialState: ReviewsState = {
  data: [],
  current: DefaultReviewFields,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewInterface[]>) => {
      state.data = [...action.payload];
    },
    setCurrentReview: (state, action: PayloadAction<ReviewInterface>) => {
      state.current = action.payload;
    },
    cleanReviews: (state) => {
      state.data = [];
    },
    addReview: (state, action: PayloadAction<ReviewInterface>) => {
      state.data = [...state.data, action.payload];
    },
    updateReview: (state, action: PayloadAction<ReviewInterface>) => {
      state.data = [...state.data.filter(review => review.id !== action.payload.id), action.payload];
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.data = [...state.data.filter(user => user.id !== action.payload)];
    },
  },
});

export const { setReviews, setCurrentReview, cleanReviews, addReview, updateReview, deleteReview } = reviewsSlice.actions;

export const selectReviews = (state: RootState) => state.reviews.data;
export const currentReview = (state: RootState) => state.reviews.current;

export default reviewsSlice.reducer;
