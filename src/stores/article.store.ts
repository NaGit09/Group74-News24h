import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article, ArticleDetail, ArticleState } from "@/types/news";

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
    setCurrentArticle(state, action: PayloadAction<ArticleDetail | null>) {
      state.currentArticle = action.payload;
    },
    clearArticles(state) {
      state.articles = [];
    },
    clearCurrentArticle(state) {
      state.currentArticle = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setArticles,
  clearArticles,
  setCurrentArticle,
  clearCurrentArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
