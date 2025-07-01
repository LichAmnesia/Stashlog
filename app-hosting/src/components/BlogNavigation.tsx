'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  slug: string;
  title: string;
  date: string;
  name?: string;
  href?: string;
  children?: NavigationItem[];
}

interface NavItemProps {
  item: {
    name: string;
    href?: string;
    icon?: string;
    slug?: string;
    title?: string;
    date?: string;
    children?: NavigationItem[];
  };
  level?: number;
}

function NavItem({ item, level = 0 }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const [isOpen, setIsOpen] = useState(isActive || (item.children && item.children.some((child) => pathname === `/posts/${child.slug}`)));

  const isCollapsible = item.children && item.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ paddingLeft: `${level * 1}rem` }}>
      <div className="flex items-center justify-between py-2">
        <Link
          href={item.href || '#'}
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors w-full ${
            isActive ? 'bg-[var(--secondary-color)]' : 'hover:bg-slate-200'
          }`}
          style={{ color: 'var(--text-primary)' }}
        >
          {item.icon && (
            <span
              className="material-icons text-base"
              style={{ color: isActive ? 'var(--primary-color)' : '#64748b' }}
            >
              {item.icon}
            </span>
          )}
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
        {isCollapsible && (
          <button
            onClick={handleToggle}
            className="ml-2 p-1 rounded-full hover:bg-slate-200"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="material-icons text-base">{isOpen ? 'expand_less' : 'expand_more'}</span>
          </button>
        )}
      </div>
      {isCollapsible && isOpen && (
        <div className="border-l border-slate-300 ml-4">
          {item.children?.map((child: NavigationItem, index: number) => (
            <NavItem 
              key={`${child.slug || child.name}-${index}`} 
              item={{...child, name: child.title, href: `/posts/${child.slug}`}} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogNavigation({ navigation }: { navigation: NavigationItem[] }) {
  const homePost = navigation.length > 0 ? navigation[0] : null;

  const navItems = [
    { name: 'Home', href: homePost ? `/posts/${homePost.slug}` : '/', icon: 'home' },
    ...navigation.map(post => ({ ...post, name: post.title, href: `/posts/${post.slug}`, icon: 'article' })),
    { name: 'Contact', href: '/contact', icon: 'email' },
  ];

  return (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item, index) => (
        <NavItem key={`${item.href}-${index}`} item={item} />
      ))}
    </nav>
  );
}

