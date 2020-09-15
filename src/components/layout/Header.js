import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../apollo/queries/getUser';
import client from '../../apollo/config';
import Error from '../Error';

const Header = () => {
  // Routing
  const history = useHistory();

  // Apollo Query
  const { data, loading, error } = useQuery(GET_USER);

  // Protect to not access to data before to get any results
  if (loading) return null;

  // If there is no user
  if (!data) {
    return history.push('/signin');
  }

  // If there is a error
  if (error) {
    return <Error />;
  }

  const { name, surname } = data.getUser;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    client.clearStore();
    history.push('/signin');
  };

  return (
    <div className="sm:flex sm:justify-between mb-6">
      <p className="mr-2 mb-5 lg:mb-0">
        Hello {name} {surname}
      </p>
      <button
        type="button"
        className="bg-blue-800 w-full sm:w-auto
        font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Header;
