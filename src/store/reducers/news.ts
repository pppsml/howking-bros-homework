import { createSlice } from '@reduxjs/toolkit'

import { fetchNews } from '../actions/news'

import type { News } from '../types'

type NewsStateType = {
  items: News[];
  page: number;
  totalPages: number,
  searchValue: string;
  isLoading: boolean;
  error: string | null,
}

const initialState: NewsStateType = {
  items: [],
  page: 0,
  totalPages: 0,
  searchValue: '',
  isLoading: false,
  error: null,
}

const newsSlice = createSlice({
  initialState,
  name: 'news',
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.isLoading = false
      const { items, page, searchValue, totalPages } = action.payload

      state.items = items
      state.page = page
      state.totalPages = totalPages
      state.searchValue = searchValue
    })
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message!
    })
  }
})

export const {  } = newsSlice.actions

export default newsSlice.reducer