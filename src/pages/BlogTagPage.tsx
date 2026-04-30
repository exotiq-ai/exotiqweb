import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/blog/BlogCard';
import { formatTaxonomyLabel } from '../lib/blog';
import { usePublishedBlogPosts } from '../hooks/useBlogData';

export default function BlogTagPage() {
  const { tag } = useParams();
  const { posts, loading } = usePublishedBlogPosts();
  const filtered = posts.filter((post) => tag ? post.tags.includes(tag) : false);

  if (!tag) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title={`${formatTaxonomyLabel(tag)} Tag | Exotiq Blog`}
        description={`Posts tagged ${formatTaxonomyLabel(tag)} from the Exotiq editorial team.`}
        url={`https://exotiq.ai/blog/tag/${tag}`}
        noindex={filtered.length < 5}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="text-sm text-primary-600 font-semibold">
          Back to all posts
        </Link>
        <h1 className="font-dfaalt text-4xl text-gray-900 mt-3 mb-3">Tag: {formatTaxonomyLabel(tag)}</h1>
        <p className="text-gray-700 mb-8">
          This tag becomes indexable after it reaches depth and quality thresholds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? <p className="text-gray-500">Loading...</p> : null}
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

