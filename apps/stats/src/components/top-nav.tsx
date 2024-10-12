import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

export const TopNav = ({ children }: { children: ReactNode }) => {
  return (
    <nav className='sticky top-0 z-50 w-full bg-white'>
      <DropdownMenu>
        <DropdownMenuTrigger className='p-4'>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

type NavItemProps = {
  destination: string;
  external: boolean;
  label: string;
};

export const TopNavItem = ({ destination, external, label }: NavItemProps) => {
  if (external) {
    return (
      <DropdownMenuItem>
        <a href={destination} target='_blank' rel='noopener noreferrer'>
          {label}
        </a>
      </DropdownMenuItem>
    );
  } else {
    return (
      <DropdownMenuItem>
        <Link to={destination}>{label}</Link>
      </DropdownMenuItem>
    );
  }
};
