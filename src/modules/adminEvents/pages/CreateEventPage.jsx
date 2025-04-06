import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../../auth/providers/AuthProvider';

const AdminEventsPage = () => {
  const { credentials } = useAuth();

  if (!credentials || credentials.role !== 'ADMIN_EVENTO') {
    return <Navigate to="/login" replace />;
  }

  return (
     <Outlet/>
  );
};

export default AdminEventsPage;
