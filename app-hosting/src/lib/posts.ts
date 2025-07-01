
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      if (path.extname(filename) !== '.mdx') {
        return null;
      }
      const filePath = path.join(postsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      if (!data.title) {
        return null;
      }

      return {
        slug: filename.replace(/\.mdx$/, ''),
        title: data.title,
        date: data.date || '2025-01-01',
      };
    })
  );

  // Filter out null values and sort posts by date in descending order
  const filteredPosts = posts.filter(post => post !== null) as { slug: string; title: string; date: string }[];
  filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return filteredPosts;
}

export async function getNavigation() {
  const posts = await getPosts();

  // Return the posts directly for navigation
  return posts;
}
