import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">event<span>map</span></Link>
      </div>
      <ul>
        <li>
          <Link to="/">Map</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/tracked-events">
            <FontAwesomeIcon icon={faHeart} /> Tracked
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
