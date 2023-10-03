// frontend/src/components/AdminLayout.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Breadcrumbs, Breadcrumb, Boundary, Text } from '@blueprintjs/core';

import AdminNav from './AdminNav';
import AdminHome from '../../pages/Admin/AdminHome';
import AccountSettings from '../../pages/Admin/AccountSettings';
import BlogViewList from '../../pages/Admin/BlogList';
import BlogUpload from '../../pages/Admin/BlogUpload';
import BlogEditMarkdown from '../../pages/Admin/BlogEditMarkdown';
import PortfolioViewList from '../../pages/Admin/PortfolioList';
import PortfolioArtifactEdit from '../../pages/Admin/PortfolioArtifactEdit';
import PortfolioArtifactUpload from '../../pages/Admin/PortfolioArtifactUpload';
import ResumeEditMarkdown from '../../pages/Admin/ResumeEditMarkdown';
import ResumeUpload from '../../pages/Admin/ResumeUpload';
import ResumeViewList from '../../pages/Admin/ResumeList';

const AdminLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const editMarkdownIdMatch = pathname.match(/\/([a-zA-Z0-9]+)$/);
  const editMarkdownId = editMarkdownIdMatch ? editMarkdownIdMatch[1] : null;

  const Crumb = (children) => (
    <Text tagName='span' ellipsize={true} className='bp5-text-small'>
      {children}
    </Text>
  );

  const BREADCRUMBS = [
    {
      href: '/admin',
      text: Crumb('Home'),
    },
    {
      href: '/admin/account-settings',
      text: Crumb('Account Settings'),
    },
    {
      href: '/admin/blog',
      text: Crumb('Blog'),
    },
    {
      href: '/admin/blog/upload-post',
      text: Crumb('Upload Blog Post'),
    },
    {
      href: `/admin/blog/${editMarkdownId}`,
      text: Crumb(`Edit Blog ID #${editMarkdownId}`),
    },
    {
      href: '/admin/portfolio',
      text: Crumb('Portfolio'),
    },
    {
      href: '/admin/portfolio/upload-artifact',
      text: Crumb('Upload Portfolio Artifact'),
    },
    {
      href: '/admin/resumes',
      text: Crumb('Résumés'),
    },
    {
      href: `/admin/resumes/${editMarkdownId}`,
      text: Crumb(`Edit Resume ID#${editMarkdownId}`),
    },
    {
      href: '/admin/resumes/upload-resume',
      text: Crumb('Upload Résumé'),
    },
  ];

  // Get the breadcrumbs for the current route
  const currentBreadcrumbs = BREADCRUMBS.filter((breadcrumb) =>
    location.pathname.includes(breadcrumb.href || '')
  );

  if (location.pathname === '/admin') {
    currentBreadcrumbs.length = 0;
  }

  // Function to render the last breadcrumb
  const renderCurrentBreadcrumb = (breadcrumb) => {
    // Customize rendering of the last breadcrumb
    if (editMarkdownIdMatch) {
      return (
        <Breadcrumb
          icon='document'
          current={true}
          href={undefined}
          text={breadcrumb.text}
        />
      );
    } else {
      return (
        <Breadcrumb current={true} href={undefined} text={breadcrumb.text} />
      );
    }
  };

  return (
    <>
      <AdminNav />
      {location.pathname === '/admin' ? (
        ''
      ) : (
        <>
          <br />
          <br />
          <br />
        </>
      )}

      <div style={{ paddingLeft: 20 }}>
        <Breadcrumbs
          collapseFrom={Boundary.START}
          currentBreadcrumbRenderer={renderCurrentBreadcrumb}
          items={currentBreadcrumbs}
          minVisibleItems={0}
        />
      </div>
      <Routes>
        <Route path='' element={<AdminHome />} />
        <Route path='account-settings' element={<AccountSettings />} />
        <Route path='blog' element={<BlogViewList />} />
        <Route path='blog/upload-post' element={<BlogUpload />} />
        <Route path='blog/:id' element={<BlogEditMarkdown />} />
        <Route path='portfolio' element={<PortfolioViewList />} />
        <Route path='portfolio/:id' element={<PortfolioArtifactEdit />} />
        <Route
          path='portfolio/upload-artifact'
          element={<PortfolioArtifactUpload />}
        />
        <Route path='resumes' element={<ResumeViewList />} />
        <Route path='resumes/upload-resume' element={<ResumeUpload />} />
        <Route path='resumes/:id' element={<ResumeEditMarkdown />} />
      </Routes>
    </>
  );
};

export default AdminLayout;
