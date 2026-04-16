import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Building2, User, LogOut, Bell } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="app-container">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Activity color="#2563eb" size={28} />
          <span className="sidebar-brand">MedTransfer</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`nav-item ${currentPath === '/' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link 
            to="/general" 
            className={`nav-item ${currentPath.includes('/general') ? 'active' : ''}`}
          >
            <Building2 size={20} />
            <span>상급병원 (보내기)</span>
          </Link>
          <Link 
            to="/partner" 
            className={`nav-item ${currentPath.includes('/partner') ? 'active' : ''}`}
          >
            <User size={20} />
            <span>협력병원 (받기)</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="btn btn-outline" style={{width: '100%', justifyContent: 'flex-start'}}>
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h2 className="text-lg font-semibold">
              {currentPath.includes('/general') ? '상급병원 워크스페이스' : 
               currentPath.includes('/partner') ? '협력병원 워크스페이스' : '대시보드'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-outline" style={{padding: '0.5rem', borderRadius: '50%'}}>
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div 
                style={{
                  width: '32px', height: '32px', borderRadius: '50%', 
                  backgroundColor: 'var(--primary-color)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', fontSize: '14px'
                }}
              >
                U
              </div>
              <div>
                <div className="text-sm font-medium">관리자</div>
                <div className="text-xs text-gray-500">테스트 계정</div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* Dynamic route component will be rendered here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
