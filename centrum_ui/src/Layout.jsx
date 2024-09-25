import React from 'react';
import CollapsibleNavBar from './screens/Navigation/CollpasibleNabar';
import Footer from './screens/Navigation/Footer';


const Layout = ({ children, showHeader = true, showFooter = true }) => (
  <div>
    {showHeader && <CollapsibleNavBar />}
    <main>{children}</main>
    {showFooter && <Footer />}
  </div>
);

export default Layout;

