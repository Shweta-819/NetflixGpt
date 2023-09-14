import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        gptMoviesResult: null,
        gptMoviesNames: null
    },
    reducers: {
        toggleGptSearchView: (state) =>{
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovieResult: (state, action) => {
            const {gptMoviesNames , gptMoviesResult} = action.payload;
            state.gptMoviesNames = gptMoviesNames;
            state.gptMoviesResult = gptMoviesResult;
        }
     
    }
})

export const {toggleGptSearchView, addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer;