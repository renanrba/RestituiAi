import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Button, buttonVariants } from './ui/button';
import { cn } from '../lib/utils';
import { MenuToggleIcon } from './ui/menu-toggle-icon';
import { useScroll } from './ui/use-scroll';

interface NavbarProps {
  onOpenModal: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { label: 'O que verificamos', href: isHome ? '#o-que-verificamos' : '/#o-que-verificamos' },
    { label: 'Como funciona', href: isHome ? '#como-funciona' : '/#como-funciona' },
    { label: 'Quem somos', href: isHome ? '#quem-somos' : '/#quem-somos' },
    { label: 'Blog', href: isHome ? '#blog' : '/#blog' },
    { label: 'Dúvidas', href: isHome ? '#faq' : '/#faq' },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
        {
          'bg-white/95 dark:bg-[#050814]/95 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-[#050814]/50 border-slate-200 dark:border-white/10 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
            scrolled && !open,
          'bg-white/90 dark:bg-[#050814]/90 border-slate-200 dark:border-white/10': open,
          'bg-transparent': !scrolled && !open,
        },
      )}
    >
      <nav
        className={cn(
          'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
          {
            'md:px-2': scrolled,
          },
        )}
      >
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="https://i.imgur.com/FsiYz4M.jpeg" alt="RestituiAI" className="h-8 w-auto rounded-md" />
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a key={i} className={cn(buttonVariants({ variant: 'ghost' }), "text-slate-600 dark:text-slate-300")} href={link.href}>
              {link.label}
            </a>
          ))}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={onOpenModal}
          >
            Verificar meu caso
          </Button>
        </div>
        
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="text-slate-600 dark:text-slate-300">
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          'bg-white/95 dark:bg-[#050814]/95 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-slate-200 dark:border-white/10 md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-4',
          )}
        >
          <div className="grid gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                className={cn(buttonVariants({
                  variant: 'ghost',
                  className: 'justify-start',
                }), "text-slate-600 dark:text-slate-300")}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              className="w-full"
              onClick={() => {
                setOpen(false);
                onOpenModal();
              }}
            >
              Verificar meu caso
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
