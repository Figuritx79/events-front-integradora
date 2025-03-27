import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../../auth/providers/AuthProvider';
import Sidebar from '../../landing/layouts/Sidebar';
import SidebarSm from '../../landing/layouts/SidebarSm';
import BackgroundLines from '../../landing/layouts/BackgroundLines';

const AdminEventsPage = () => {
  const { credentials } = useAuth();

  if (!credentials || credentials.role !== 'ADMIN_EVENTO') {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="h-screen relative bg-bg-50 dark:bg-bg-950">
        <BackgroundLines/>
        <div className="w-full z-10 absolute top-0 flex h-full"> 
          <Sidebar/>
          <Outlet/>
        </div>
    </div> 
  );
};

export default AdminEventsPage;
