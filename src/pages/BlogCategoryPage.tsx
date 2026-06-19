import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/blog/BlogCard';
import { formatTaxonomyLabel } from '../lib/blog';
import { usePublishedBlogPosts } from '../hooks/useBlogData';

export default function BlogCategoryPage() {
  const { category } = useParams();
  const { posts, loading } = usePublishedBlogPosts();
  const filtered = posts.filter((post) => post.category === category);

  if (!category) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title={`${formatTaxonomyLabel(category)} Articles | Exotiq Blog`}
        description={`Explore Exotiq insights about ${formatTaxonomyLabel(category)} for rental fleet operators.`}
        url={`https://exotiq.ai/blog/category/${category}`}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="text-sm text-primary-600 font-semibold">
          Back to all posts
        </Link>
        <h1 className="font-dfaalt text-4xl text-gray-900 mt-3 mb-3">{formatTaxonomyLabel(category)}</h1>
        <p className="text-gray-700 mb-8">Curated guides in this category.</p>

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

