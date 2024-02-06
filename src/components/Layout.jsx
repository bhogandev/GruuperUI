import React from 'react';
import { useSelector } from 'react-redux';
import AppNav from './AppNav';
import { PROFILE_DEFUALT } from '../middleware/UIDefaults';

const Layout = ({ children }) => {
  const isProtectedRoute =
    window.location.pathname.startsWith('/home') ||
    window.location.pathname.startsWith('/profile') ||
    window.location.pathname.startsWith('/Messenger');

  const { userName, profile } = useSelector((state) => state.user);

  return (
    <div>
      {isProtectedRoute && (
        <AppNav userName={userName} profile={profile ? profile : PROFILE_DEFUALT} />
      )}
      {children}
    </div>
  );
};

export default Layout;
