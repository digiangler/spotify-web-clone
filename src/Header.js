import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React from 'react';
import { useEffect } from 'react';

import './Header.css';
import { useStateProviderValue } from './StateProvider';

function Header({ spotify }) {
  const [{ user }, dispatch] = useStateProviderValue();

  return (
    <div className='header'>
      <div class='header__left'>
        <SearchIcon />
        <input
          placeholder='Search for Artists, Songs, or Podcasts '
          type='text'
        />
      </div>
      <div class='header__right'>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
