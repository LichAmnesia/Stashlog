
'use client';

import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from './AuthContext';

interface AuthProps {
  children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const { user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      const checkAuth = async () => {
        const docRef = doc(db, 'authorized_users', user.email!);
        const docSnap = await getDoc(docRef);
        setIsAuthorized(docSnap.exists());
        setAuthLoading(false);
      };
      void checkAuth();
    } else {
      setAuthLoading(false);
    }
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code !== 'auth/cancelled-popup-request') {
        setError(error.message);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'authorized_users', userCredential.user.email!), {
        email: userCredential.user.email,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (loading || authLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="text-[#3d98f4]">
                <svg className="size-7" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Stashlog</h2>
            </div>
          </div>
        </header>
        <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                {isSignUp ? 'Create an account' : 'Welcome back'}
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                {isSignUp ? 'Sign up to access your private blog.' : 'Sign in to access your private blog.'}
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => { 
              e.preventDefault(); 
              if (isSignUp) {
                handleSignUp();
              } else {
                handleSignIn();
              }
            }}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label className="sr-only" htmlFor="email-address">Email address</label>
                  <input
                    autoComplete="email"
                    className="relative block w-full appearance-none rounded-t-md border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#3d98f4] focus:outline-none focus:ring-[#3d98f4] sm:text-sm"
                    id="email-address"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    autoComplete="current-password"
                    className="relative block w-full appearance-none rounded-b-md border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#3d98f4] focus:outline-none focus:ring-[#3d98f4] sm:text-sm"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#3d98f4] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-[#3d98f4] focus:ring-offset-2"
                  type="submit"
                >
                  {isSignUp ? 'Sign up' : 'Log in'}
                </button>
              </div>
            </form>
            <div className="text-center text-sm">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-[#3d98f4] hover:text-sky-500"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
            <div className="relative mt-6">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                className="group relative flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                type="button"
                onClick={signInWithGoogle}
              >
                <svg className="mr-2 size-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-4">You are not authorized to view this content.</p>
          <p className="mt-2">For permissions and support, please contact <a href="mailto:me@alwa.info" className="text-[#3d98f4] hover:underline">me@alwa.info</a>.</p>
          <button
            onClick={() => auth.signOut()}
            className="mt-4 px-4 py-2 bg-[#3d98f4] text-white rounded hover:bg-sky-500"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

