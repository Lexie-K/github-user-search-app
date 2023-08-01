import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const sorting = ['start with highest', 'start with lowest'];

const initialState = {
  inputUser: '',
  success: false,
  error: null,
  showResultUsers: [],
  status: 'idle',
  currentPage: 0,
  totalCount: null,
  sortBy: sorting,
  sortValue: 'start with highest',
};


const GITHUB_USERS_URL = `https://api.github.com/search/users`;

const getUrl = ({ sortValue, inputUser, currentPage }) =>
  `${GITHUB_USERS_URL}?q=${inputUser}in:login+type:user&sort=repositories&order=${
    sortValue === 'start with highest' ? 'desc' : 'asc'
  }&page=${currentPage}`;

export const fetchUsers = createAsyncThunk(
  'search/fetchUsers',
  async ({ inputUser, currentPage, sortValue }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        getUrl({ sortValue, inputUser, currentPage })
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.inputUser = action.payload;
      console.log(action)
    },
    setClearSearch: state => {
      state.currentPage = 1;
      state.showResultUsers = [];
    },
    setClearResult: state => {
      state.showResultUsers = [];
      state.startPagination = 0;
      state.currentPage = 1;
    },
    setNextPage: state => {
      state.currentPage = state.currentPage + 1;
    },
    setSort: (state, action) => {
      state.sortValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, state => {
        state.success = false;
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.success = true;
        state.status = 'succeeded';
        state.totalCount = action.payload?.total_count;
        state.showResultUsers = [
          ...state.showResultUsers,
          ...action.payload?.items,
        ];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.success = false;
        state.showResultUsers = [];
        state.error = action.payload;
      });
  },
});

export const {
  setInput,
  setClearSearch,
  setNextPage,
  setClearResult,
  setSort,
} = searchSlice.actions;

export default searchSlice.reducer;
