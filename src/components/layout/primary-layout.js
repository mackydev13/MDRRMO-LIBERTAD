import React, { useState } from 'react';
import { Nav, Header} from 'components/layout/nav'


function PrimaryLayout({ children }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



  return (
    <>
      <div className="min-h-full flex">
        {/* Sidebar */}
       <aside style={{backgroundColor: '#0B5A81'}} className={`w-64 text-white p-4 flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0`}>
          <Nav />
        </aside>
        {/* Main Content */}
        <main className="flex-1">
          <Header />
          <div className="py-4 sm:px-6 md:px-3">
            {children}
          </div>
        </main>      
      </div>
    </>
  )
}

export default PrimaryLayout;

