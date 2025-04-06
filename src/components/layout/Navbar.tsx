
import React from 'react';
import { Bell, Settings, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  return (
    <div className="border-b px-6 py-3 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2 sm:gap-4">
        <h1 className="text-xl font-semibold text-primary">InvenLiquidate</h1>
        
        <div className="hidden md:flex relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search inventory, campaigns..." 
            className="pl-9 w-[300px] bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-red" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Inventory Alert</span>
                <span className="text-sm text-muted-foreground">15 products identified for liquidation</span>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <span className="font-medium">Campaign Ended</span>
                <span className="text-sm text-muted-foreground">Summer Collection campaign completed</span>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative pl-2 flex items-center gap-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">RA</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-medium">Retail Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
