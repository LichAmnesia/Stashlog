
import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import BlogLayout from '@/components/BlogLayout';
import { getNavigation } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Type definitions for MDX components
interface MDXLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}

interface MDXImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

interface MDXHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

interface MDXParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

interface MDXListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

interface MDXListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

interface MDXStrongProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface MDXBlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children?: React.ReactNode;
}

// Custom MDX components
const components = {
  a: ({ href, children, ...props }: MDXLinkProps) => {
    const isExternal = href?.startsWith('http');
    return (
      <Link 
        href={href || '#'} 
        className="text-[var(--primary-color)] hover:underline font-medium inline-flex items-center gap-1"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </Link>
    );
  },
  img: ({ src, alt, ...props }: MDXImageProps) => {
    // Extract width and height from props if they exist, otherwise use defaults
    const { width, height, ...restProps } = props;
    return (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={typeof width === 'number' ? width : 800}
        height={typeof height === 'number' ? height : 600}
        className="w-full h-auto my-8 rounded-lg shadow-lg"
        {...restProps}
      />
    );
  },
  h1: ({ children, ...props }: MDXHeadingProps) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-[var(--text-primary)]" {...props}>{children}</h1>
  ),
  h2: ({ children, ...props }: MDXHeadingProps) => (
    <h2 className="text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: MDXHeadingProps) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 text-[var(--text-primary)]" {...props}>{children}</h3>
  ),
  p: ({ children, ...props }: MDXParagraphProps) => {
    // Check if children contains any block-level elements (like images)
    const hasBlockContent = Array.isArray(children) && 
      children.some((child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          return child.type === 'img' || 
                 child.type === Image || 
                 (child.props as Record<string, unknown>)?.mdxType === 'img';
        }
        return false;
      });
    
    // If it has block content, render as div instead of p
    if (hasBlockContent) {
      return <div className="mb-6 leading-relaxed text-slate-700" {...props}>{children}</div>;
    }
    
    return <p className="mb-6 leading-relaxed text-slate-700" {...props}>{children}</p>;
  },
  ul: ({ children, ...props }: MDXListProps) => (
    <ul className="mb-6 ml-6 list-disc space-y-2" {...props}>{children}</ul>
  ),
  li: ({ children, ...props }: MDXListItemProps) => (
    <li className="text-slate-700 leading-relaxed" {...props}>{children}</li>
  ),
  strong: ({ children, ...props }: MDXStrongProps) => (
    <strong className="font-semibold text-[var(--text-primary)]" {...props}>{children}</strong>
  ),
  blockquote: ({ children, ...props }: MDXBlockquoteProps) => (
    <blockquote className="border-l-4 border-[var(--primary-color)] pl-4 my-6 italic text-slate-600" {...props}>
      {children}
    </blockquote>
  ),
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const navigation = await getNavigation();

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { 
        parseFrontmatter: false,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development',
        },
      },
      components,
    });

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    return (
      <BlogLayout navigation={navigation}>
        <article className="mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold leading-tight tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>By Shen Huang</span>
              <span>•</span>
              <time dateTime={data.date}>{data.date ? formatDate(data.date) : 'Unknown Date'}</time>
            </div>
          </header>
          
          <div className="blog-content">
            {mdxContent}
          </div>

          

          {/* Author section */}
          <div className="mt-12 p-6 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white text-2xl font-bold">
                  SH
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>About Author</h3>
                <p className="text-slate-600 mb-3">
                  This is about the author
                </p>
                <div className="flex gap-4 text-sm">
                  <a href="mailto:me@alwa.info" className="text-[var(--primary-color)] hover:underline">
                    联系邮箱
                  </a>
                  <a href="https://discord.gg/gF4m5vWvV3" target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] hover:underline">
                    加入 Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </BlogLayout>
    );
  } catch {
    return (
      <BlogLayout navigation={navigation}>
        <p style={{ color: 'var(--text-primary)' }}>Post not found.</p>
      </BlogLayout>
    );
  }
}
