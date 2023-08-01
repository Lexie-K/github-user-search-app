import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { fetchUsers, setNextPage } from '../../store/slices/searchSlice';
import { Link } from 'react-router-dom';

const ShowUsers = () => {
  const status = useSelector(state => state.search.status);
  const inputUser = useSelector(state => state.search.inputUser);
  const userList = useSelector(state => state.search.showResultUsers);
  const totalCount = useSelector(state => state.search.totalCount);
  const currentPage = useSelector(state => state.search.currentPage);

  const isLimit = totalCount !== null && userList.length >= totalCount;
  const dispatch = useDispatch();
  const loadUsers = async () => {
    if (isLimit) {
      return;
    }
    dispatch(fetchUsers({ inputUser, currentPage }));
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;

    const scrollTop = document.documentElement.scrollTop;

    const clientScroll = document.documentElement.clientHeight;

    if (scrollTop + clientScroll >= scrollHeight && !isLimit) {
      dispatch(setNextPage());
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isLimit]);
  return (
    <div>
      {status === 'loading' ? (
        <div className="wrapper">
          <div className="loading">LOADING...</div>
        </div>
      ) : (
        <>
          <Grid
            container
            align="center"
            justify="center"
            alignItems="center"
            p={5}
            rowSpacing={5}
            columnSpacing={10}
          >
            {userList?.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    width: 200,
                    height: '100%',
                    borderRadius: '8%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '10px',
                  }}
                >
                  <CardMedia
                    component="img"
                    src={item.avatar_url}
                    alt={item.login}
                    sx={{
                      width: { md: '200px', lg: '200px', xs: '140px' },
                      maxHeight: { md: '200px', lg: '150px', xs: '140px' },
                      objectFit: 'contain',
                    }}
                  />
                  <CardContent sx={{ paddingLeft: '0px' }}>
                    <Typography sx={{ fontSize: '12px' }}>
                      Username: {item?.login}
                    </Typography>
                    <Link to={`/detailspage/${item.login}`}>View Profile</Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default ShowUsers;
