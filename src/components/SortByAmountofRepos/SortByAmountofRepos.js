import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/slices/searchSlice';
import './styledSortBy.css'
const SortByAmountofRepos = () => {
  const sortrepos = ['start with highest', 'start with lowest'];
  const dispatch = useDispatch();
  const sortValue = useSelector(state => state.search.sortValue);

  const changeSorthandler = e => {
    dispatch(setSort(e.target.value));
  };

  return (
    <>
      <div className="styledCategoryForm">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel htmlFor="sorting">Sort by</InputLabel>
          <Select
            label="Sort By"
            value={sortValue}
            onChange={changeSorthandler}
            inputProps={{
              id: 'sorting',
            }}
          >
            {sortrepos?.map((sort, index) => (
              <MenuItem value={sort} key={index}>
                {sort}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default SortByAmountofRepos;
