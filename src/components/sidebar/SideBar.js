import React from 'react';
import ProjectList from './ProjectList';
import TeamMembar from './TeamMembar';

export default function SideBar() {
  return (
    <div className="sidebar">
      <ProjectList />
      <TeamMembar />
    </div>
  );
}
