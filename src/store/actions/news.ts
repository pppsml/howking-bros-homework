import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { News } from "../types";

type ReturnValue = {
  page: number;
  searchValue: string;
  totalPages: number;
  items: News[];
}

export const fetchNews = createAsyncThunk<ReturnValue, {page: number, searchValue: string}, {rejectValue: string}>(
  'news/getNews', 
  async ({page, searchValue}, {rejectWithValue}) => {
    const response = await axios.get<News[]>(`/api/news?_page=1&_limit=9&_sort=data.publishedAt&_order=desc${
      searchValue ? `&data.title_like=${searchValue}` : ''
    }`)

    if (response.statusText !== "OK") {
      throw rejectWithValue('error')
    }

    const pageLinks = response.headers.link
    let lastPage:number = 1

    if (pageLinks) {
      const pageLinksArr = pageLinks.split(',')
      lastPage = Number(pageLinksArr.filter(l => /rel="last"/.test(l))[0].match(/_page=(\d+)/)![1])
    }


    const items = response.data

    return {
      page,
      totalPages: lastPage,
      searchValue,
      items,
    }
  }
)