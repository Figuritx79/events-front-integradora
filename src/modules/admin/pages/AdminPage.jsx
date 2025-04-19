import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../../auth/providers/AuthProvider';
import SidebarA from '../../landing/layouts/SidebarA';
import SidebarSm from '../../landing/layouts/SidebarSm';
import BackgroundLines from '../../landing/layouts/BackgroundLines';

const AdminPage = () => {
      const { credentials } = useAuth();
    
      if (!credentials || credentials.role !== 'SUPER_ADMIN') {
        return <Navigate to="/login" replace />;
      }

      return (
        <div className="h-screen relative bg-bg-50 dark:bg-bg-950">
          <BackgroundLines/>
          <div className="w-full z-10 absolute top-0 flex h-full"> 
            <SidebarA/>
            <Outlet/>
          </div>
        </div> 
      );
}

export default AdminPage;