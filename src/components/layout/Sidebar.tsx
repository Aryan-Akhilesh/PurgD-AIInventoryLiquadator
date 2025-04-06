
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  LineChart, 
  Megaphone, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink = ({ to, icon, label, isCollapsed }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Always expand on mobile
  const effectiveCollapsed = isMobile ? false : isCollapsed;

  return (
    <div 
      className={cn(
        "bg-sidebar flex flex-col border-r border-sidebar-border h-screen transition-all",
        effectiveCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {!effectiveCollapsed && (
          <div className="text-sidebar-foreground font-bold text-xl">
            InvenLiquidate
          </div>
        )}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {effectiveCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <SidebarLink 
            to="/" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isCollapsed={effectiveCollapsed} 
          />
          <SidebarLink 
            to="/inventory" 
            icon={<Package size={20} />} 
            label="Inventory Analysis" 
            isCollapsed={effectiveCollapsed} 
          />
          <SidebarLink 
            to="/strategies" 
            icon={<LineChart size={20} />} 
            label="Liquidation Strategy" 
            isCollapsed={effectiveCollapsed} 
          />
          <SidebarLink 
            to="/campaigns" 
            icon={<Megaphone size={20} />} 
            label="Campaigns" 
            isCollapsed={effectiveCollapsed} 
          />
          <SidebarLink 
            to="/analytics" 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            isCollapsed={effectiveCollapsed} 
          />
        </div>
      </ScrollArea>
      
      <div className="p-3 space-y-1">
        <SidebarLink 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          isCollapsed={effectiveCollapsed} 
        />
        <SidebarLink 
          to="/help" 
          icon={<HelpCircle size={20} />} 
          label="Help & Support" 
          isCollapsed={effectiveCollapsed} 
        />
      </div>
    </div>
  );
}
