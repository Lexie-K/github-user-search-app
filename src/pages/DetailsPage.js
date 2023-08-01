import React, { useEffect, useState } from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
  const { login } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [repos, setRepos] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Promise.all([
        axios.get(`https://api.github.com/users/${login}`),
        axios.get(`https://api.github.com/users/${login}/repos`),
      ]);
      setUserInfo(response[0].data);
      setRepos(response[1].data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        minWidth: '320px',
        border: '1px solid',
        borderRadius: '10px',
      }}
    >
      <Link to="/">Go Back to Search</Link>
      <CardMedia
        component="img"
        src={userInfo?.avatar_url}
        alt={userInfo?.login}
        sx={{ maxWidth: '320px' }}
      />
      <CardContent>
        <Typography>{userInfo?.name}</Typography>
        <Typography>{userInfo?.bio}</Typography>
        <Typography>{userInfo?.followers} Followers /{userInfo?.following} Following</Typography>
        <a href={userInfo?.html_url}>View Github Profile</a>
        <Typography variant='h6' >The Repositories:</Typography>
        {repos?.map((repo, index) => (
              <Typography value={repo} key={index}>
                <a href={repo?.html_url}>{repo.name}</a>
              </Typography>
            ))}
      </CardContent>
    
    </Box>
  );
};

export default DetailsPage;
