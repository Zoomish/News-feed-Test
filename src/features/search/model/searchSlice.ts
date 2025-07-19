import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    term: string;
    type: "search" | "tag";
}

const initialState: SearchState = {
    term: "",
    type: "search",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm(
            state,
            action: PayloadAction<{ term: string; type: "search" | "tag" }>,
        ) {
            state.term = action.payload.term;
            state.type = action.payload.type;
        },
    },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
