import React from 'react';
import Blogs from '../blogs/Blogs';
import Sidebar from '../sidebar/Sidebar';

export default function Home() {
  return (
    <section className="wrapper">
      <Sidebar />
      <Blogs />
    </section>
  );
}
