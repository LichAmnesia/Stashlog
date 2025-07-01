
import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import BlogLayout from '@/components/BlogLayout';
import { getNavigation } from '@/lib/posts';

export default async function ContactPage() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, 'contact.mdx');
  const navigation = await getNavigation();

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
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
        <article className="mx-auto max-w-3xl rounded-lg bg-[var(--background-color)]">
          <header className="mb-8 border-b border-slate-200 pb-6">
            <h2 className="text-[var(--text-primary)] text-4xl font-bold leading-tight tracking-tight">{data.title}</h2>
            <p className="mt-2 text-[var(--text-secondary)] text-base">Published by Shen Huang on {data.date ? formatDate(data.date) : 'Unknown Date'}</p>
          </header>
          <div className="prose prose-slate max-w-none text-[var(--text-primary)] prose-headings:text-[var(--text-primary)] prose-p:text-slate-700 prose-a:text-[var(--primary-color)] hover:prose-a:underline">
            {mdxContent}
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
