import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Sidebar = () => {
  const history = useHistory();
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">
          <Link className="text-white mb-2 block" to="/">
            CRM
          </Link>
        </p>
      </div>

      <nav className="mt-5 list-none">
        <li
          className={
            history.location.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link to="/" className="text-white block">
            Customers
          </Link>
        </li>
        <li
          className={
            history.location.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link to="/orders" className="text-white block">
            Orders
          </Link>
        </li>
        <li
          className={
            history.location.pathname === '/products'
              ? 'bg-blue-800 p-2'
              : 'p-2'
          }
        >
          <Link to="/products" className="text-white block">
            Products
          </Link>
        </li>
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Tops</p>
      </div>

      <nav className="mt-5 list-none">
        <li
          className={
            history.location.pathname === '/best-sellers'
              ? 'bg-blue-800 p-2'
              : 'p-2'
          }
        >
          <Link to="/best-sellers" className="text-white block">
            Best Sellers
          </Link>
        </li>
        <li
          className={
            history.location.pathname === '/best-customers'
              ? 'bg-blue-800 p-2'
              : 'p-2'
          }
        >
          <Link to="/best-customers" className="text-white block">
            Best Customers
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
