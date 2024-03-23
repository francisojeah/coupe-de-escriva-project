import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SportsType } from '../../utils/constants';

const initialState: any = {
  sport: SportsType.FOOTBALL,
};

export const subscribe = () => {};

export const sportSlice = createSlice({
  name: 'sport',
  initialState,
  reducers: {
    updateSport: (state, action: PayloadAction<string>): void => {
      state.sport = action.payload;
    },
  },
});

export const { updateSport } = sportSlice.actions;

export default sportSlice.reducer;
