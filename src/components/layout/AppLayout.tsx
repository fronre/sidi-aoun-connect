import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showNav?: boolean;
}

export const AppLayout = ({ 
  children, 
  title, 
  showHeader = true, 
  showNav = true 
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && <Header title={title} />}
      <main className={`${showNav ? 'pb-24' : ''} ${showHeader ? '' : 'pt-0'}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};
