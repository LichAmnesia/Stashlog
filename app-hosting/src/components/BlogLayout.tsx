
'use client';

import BlogNavigation from './BlogNavigation';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Image from 'next/image';
import { useAuth } from './AuthContext';

interface NavigationItem {
  slug: string;
  title: string;
  date: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  navigation: NavigationItem[];
}

export default function BlogLayout({ children, navigation }: BlogLayoutProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="flex h-full grow">
        <aside className="fixed top-0 left-0 z-10 flex h-screen w-72 flex-col border-r border-slate-200 bg-[var(--surface-color)] p-6 transition-transform duration-300 ease-in-out sm:translate-x-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start">
              <h1 className="text-[var(--text-primary)] text-xl font-bold">Stashlog</h1>
              <p className="text-[var(--text-secondary)] text-sm">By Shen Huang</p>
            </div>
            <BlogNavigation navigation={navigation} />
          </div>
          <div className="mt-auto">
            {user && (
              <div className="flex items-center gap-3">
                <Image
                  src={user.photoURL || 'https://avatar.vercel.sh/default'}
                  alt={user.displayName || 'User'}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {user.displayName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-[var(--text-secondary)] hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
        <main className="ml-72 flex flex-1 flex-col p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

