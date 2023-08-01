import React from 'react';
import { InputBase, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClearResult,
  setClearSearch,
  setInput,
} from '../../store/slices/searchSlice';
import { fetchUsers } from '../../store/slices/searchSlice';
import SortByAmountofRepos from '../SortByAmountofRepos/SortByAmountofRepos';

const SearchUser = () => {
  const dispatch = useDispatch();
  const inputUser = useSelector(state => state.search.inputUser);
  const currentPage = useSelector(state => state.search.currentPage);
  const sortValue = useSelector(state => state.search.sortValue);

  const changeHandler = e => {
    e.preventDefault();
    dispatch(setInput(e.target.value));
    dispatch(setClearSearch());
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setClearResult());
      dispatch(fetchUsers({ inputUser, currentPage, sortValue }));
    }
  };

  const clickHandler = e => {
    e.preventDefault();
    dispatch(setClearResult());
    dispatch(fetchUsers({ inputUser, currentPage, sortValue }));
  };

  return (
    <div className="styledSearchContainer">
      <Paper
        component="form"
        sx={{
          p: '2px 10px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '320px',
        }}
      >
        <InputBase
          label="Find User"
          inputProps={{ 'aria-label': 'search google books' }}
          value={inputUser}
          type="text"
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          autoFocus={true}
        />
        <IconButton
          type="button"
          sx={{ p: '10px', textAlign: 'end' }}
          aria-label="search"
          onClick={clickHandler}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <SortByAmountofRepos />
    </div>
  );
};

export default SearchUser;
