import BlogLayout from "@/components/BlogLayout";
import { getNavigation } from "@/lib/posts";

export default async function Home() {
  const navigation = await getNavigation();

  return (
    <BlogLayout navigation={navigation}>
      <article className="mx-auto max-w-3xl rounded-lg bg-[var(--background-color)]">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h2 className="text-[var(--text-primary)] text-4xl font-bold leading-tight tracking-tight">Welcome to Stashlog</h2>
          <p className="mt-2 text-[var(--text-secondary)] text-base">Please select a post from the navigation to start reading.</p>
        </header>
        <div className="prose prose-slate max-w-none text-[var(--text-primary)] prose-headings:text-[var(--text-primary)] prose-p:text-slate-700 prose-a:text-[var(--primary-color)] hover:prose-a:underline">
          <p>This is a private blog, and its contents are restricted to authorized users only. If you believe you should have access, please contact the administrator.</p>
        </div>
      </article>
    </BlogLayout>
  );
}
