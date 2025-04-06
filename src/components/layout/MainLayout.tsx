
import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-background">
      {isMobile ? (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute top-3 left-3 z-50">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[240px] max-w-[80vw]">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
          </div>
        </>
      ) : (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </>
      )}
    </div>
  );
}
