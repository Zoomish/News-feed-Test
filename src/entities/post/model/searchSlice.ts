import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";

interface SearchState {
  results: Post[];
}

const initialState: SearchState = {
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<Post[]>) {
      state.results = action.payload;
    },
    clearSearchResults(state) {
      state.results = [];
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
