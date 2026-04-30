import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/blog/BlogCard';
import { formatTaxonomyLabel } from '../lib/blog';
import { usePublishedBlogPosts } from '../hooks/useBlogData';

export default function BlogPage() {
  const { posts, loading } = usePublishedBlogPosts();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const queryFiltered = normalized
      ? posts.filter((post) =>
          [
            post.title,
            post.excerpt,
            post.primaryKeyword,
            post.secondaryKeywords.join(' '),
            post.tags.join(' '),
            post.category,
            post.bodyMarkdown,
          ]
            .join(' ')
            .toLowerCase()
            .includes(normalized)
        )
      : posts;
    if (activeCategory === 'all') {
      return queryFiltered;
    }
    return queryFiltered.filter((post) => post.category === activeCategory);
  }, [query, activeCategory, posts]);

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Exotiq Blog',
    description:
      'Expert guides on fleet operations, AI pricing, automation, and profitability for rental operators.',
    url: 'https://exotiq.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Exotiq.ai',
      url: 'https://exotiq.ai',
    },
  };

  return (
    <div className="pt-16 min-h-screen bg-[#fafafa]">
      <SEOHead
        title="Exotiq Blog - Fleet Growth Playbooks, AI Ops, and Profitability Guides"
        description="Read tactical guides on rental fleet operations, pricing optimization, and AI automation. Built for operators scaling with Exotiq."
        url="https://exotiq.ai/blog"
        canonical="https://exotiq.ai/blog"
        type="blog"
        structuredData={collectionSchema}
      />

      <section className="border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
          <p className="text-sm font-semibold text-primary-600 mb-3 tracking-wide">Exotiq Journal</p>
          <h1 className="font-dfaalt text-4xl md:text-5xl text-gray-900 leading-tight mb-4 tracking-tight">
            Tactical playbooks for modern fleet operators
          </h1>
          <p className="font-inter text-lg text-gray-700 max-w-3xl leading-8">
            Learn pricing strategy, automation workflows, and growth systems you can
            use this week to run a tighter operation.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-lg w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, keyword, or tactic..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] ${
                activeCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:-translate-y-0.5'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:-translate-y-0.5'
                }`}
              >
                {formatTaxonomyLabel(category)}
              </button>
            ))}
          </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Loading articles...
          </div>
        ) : null}

        {!loading && featuredPost ? (
          <article className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/40 p-6 md:p-8 mb-8">
            <p className="text-sm font-semibold text-primary-600 mb-2 tracking-wide">Featured</p>
            <h2 className="font-dfaalt text-3xl text-gray-900 mb-3 tracking-tight">
              {featuredPost.title}
            </h2>
            <p className="text-gray-700 font-inter mb-5 leading-8">{featuredPost.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-6 border-t border-gray-100 pt-4">
              <span className="rounded-full bg-primary-50 px-2 py-1">
                {featuredPost.funnelStage}
              </span>
              <span>{featuredPost.readingTimeMinutes} min read</span>
              <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
            </div>
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-white font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Read featured article
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {restPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {!loading && filteredPosts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
            No posts match this search yet. Try a broader keyword.
          </div>
        ) : null}
      </section>
    </div>
  );
}

