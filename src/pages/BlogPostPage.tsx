import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Clock } from 'lucide-react';
import { useMemo, useState } from 'react';
import SEOHead from '../components/SEOHead';
import {
  formatTaxonomyLabel,
} from '../lib/blog';
import { mdxComponents } from '../components/blog/MdxComponents';
import RariSummaryPanel from '../components/blog/RariSummaryPanel';
import BlogShareBar from '../components/blog/BlogShareBar';
import { trackEvent } from '../components/Analytics';
import { useArticleAnalytics } from '../hooks/useArticleAnalytics';
import { useActiveHeading } from '../hooks/useActiveHeading';
import { usePublishedBlogPost, usePublishedBlogPosts } from '../hooks/useBlogData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, readingTimeMinutes, headings } = usePublishedBlogPost(slug);
  const { posts: allPosts } = usePublishedBlogPosts();
  const [darkReadingMode, setDarkReadingMode] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(false);

  useArticleAnalytics(slug ?? 'unknown');
  const activeHeadingId = useActiveHeading(headings);
  const relatedPosts = useMemo(() => {
    if (!post) {
      return [];
    }

    const relatedPool = allPosts.filter((candidate) => candidate.slug !== post.slug);
    if (post.relatedPosts?.length) {
      const fromMetadata = post.relatedPosts
        .map((relatedSlug) => relatedPool.find((candidate) => candidate.slug === relatedSlug))
        .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

      if (fromMetadata.length > 0) {
        return fromMetadata.slice(0, 3);
      }
    }

    return relatedPool
      .filter((candidate) => candidate.category === post.category)
      .slice(0, 3);
  }, [allPosts, post]);

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  if (!post && !loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="font-dfaalt text-4xl text-gray-900 mb-3">Article not found</h1>
          <p className="text-gray-700 mb-6">
            That article does not exist or may have moved.
          </p>
          <Link to="/blog" className="text-primary-600 font-semibold">
            Return to blog index
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !post) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-gray-600">Loading article...</div>
      </div>
    );
  }

  const articleUrl = `https://exotiq.ai/blog/${post.slug}`;
  const ctaConfig: Record<
    typeof post.ctaType,
    { label: string; href: string; external?: boolean }
  > = {
    demo: {
      label: post.ctaCopy || 'Book a demo',
      href: 'https://calendly.com/hello-exotiq/15-minute-meeting',
      external: true,
    },
    newsletter: {
      label: post.ctaCopy || 'Join newsletter updates',
      href: '/survey',
    },
    waitlist: {
      label: post.ctaCopy || 'Join the waitlist',
      href: '/survey',
    },
    calculator: {
      label: post.ctaCopy || 'Open ROI calculator',
      href: '/pricing',
    },
  };
  const activeCta = ctaConfig[post.ctaType];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Exotiq.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://exotiq.ai/logo.png',
      },
    },
    mainEntityOfPage: articleUrl,
    image: post.ogImage || 'https://exotiq.ai/og-image.jpg',
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
  };

  return (
    <div className={`pt-16 min-h-screen ${darkReadingMode ? 'bg-gray-950' : 'bg-[#fafafa]'}`}>
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        url={articleUrl}
        canonical={post.canonicalUrl || articleUrl}
        type="article"
        author={post.author.name}
        publishedTime={post.publishDate}
        modifiedTime={post.updatedDate}
        tags={post.tags}
        section={post.category}
        structuredData={schema}
      />

      <section
        className={`border-b ${
          darkReadingMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200/80 bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-sm font-semibold ${darkReadingMode ? 'text-primary-400' : 'text-primary-600'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>

            <button
              onClick={() => setDarkReadingMode((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                darkReadingMode
                  ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {darkReadingMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkReadingMode ? 'Light reading mode' : 'Dark reading mode'}
            </button>
          </div>

          <p
            className={`text-sm font-semibold mb-2 tracking-wide ${
              darkReadingMode ? 'text-primary-300' : 'text-primary-600'
            }`}
          >
            {formatTaxonomyLabel(post.category)}
          </p>
          <h1 className={`font-dfaalt text-4xl md:text-5xl leading-tight mb-5 ${darkReadingMode ? 'text-white' : 'text-gray-900'}`}>
            {post.title}
          </h1>
          <p className={`font-inter text-lg max-w-3xl mb-5 ${darkReadingMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {post.excerpt}
          </p>
          <div
            className={`flex flex-wrap items-center gap-4 text-sm ${
              darkReadingMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <span>{post.author.name}</span>
            <span>{formatDate(post.publishDate)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTimeMinutes} min read
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8">
        <article
          className={`rounded-2xl border p-6 md:p-10 ${
            darkReadingMode
              ? 'bg-gray-900 border-gray-800 text-gray-100'
              : 'bg-white border-gray-200 text-gray-900'
          } ${darkReadingMode ? 'reading-dark' : 'reading-light'}`}
        >
          <RariSummaryPanel
            title={post.title}
            tldrShort={post.tldrShort}
            bullets={post.tldrBullets}
            summaries={post.rariSummaryModes}
            darkMode={darkReadingMode}
          />

          <div className="mdx-content max-w-[68ch]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdxComponents as any}
            >
              {post.bodyMarkdown}
            </ReactMarkdown>
          </div>

          <div className={`mt-10 pt-8 border-t ${darkReadingMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className={`font-dfaalt text-xl mb-2 ${darkReadingMode ? 'text-white' : 'text-gray-900'}`}>
              About the author
            </h3>
            <p className={darkReadingMode ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-semibold">{post.author.name}</span> — {post.author.role}
            </p>
            <p className={`mt-1 ${darkReadingMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {post.author.bio}
            </p>
            <p className={`mt-3 text-sm ${darkReadingMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {post.disclosure || 'Rari helped edit this article.'}
            </p>
          </div>
        </article>

        <section className="space-y-4 lg:hidden">
          <div
            className={`rounded-xl border p-4 ${
              darkReadingMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}
          >
            <button
              onClick={() => setTocExpanded((prev) => !prev)}
              className={`w-full flex items-center justify-between font-dfaalt text-lg mb-3 ${
                darkReadingMode ? 'text-gray-100' : 'text-gray-900'
              } lg:pointer-events-none`}
            >
              <span>On this page</span>
              <span className="text-sm lg:hidden">{tocExpanded ? 'Hide' : 'Show'}</span>
            </button>
            <ul
              className={`space-y-1.5 text-sm ${
                darkReadingMode ? 'text-gray-300' : 'text-gray-700'
              } ${tocExpanded ? 'block' : 'hidden'}`}
            >
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-3' : ''}>
                  <a
                    href={`#${heading.id}`}
                    className={`block rounded-md px-2 py-1.5 transition-colors ${
                      heading.id === activeHeadingId
                        ? darkReadingMode
                          ? 'bg-gray-800 text-blue-300'
                          : 'bg-primary-50 text-primary-700'
                        : darkReadingMode
                          ? 'hover:bg-gray-800 hover:text-blue-300'
                          : 'hover:bg-gray-100 hover:text-primary-600'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <BlogShareBar title={post.title} url={articleUrl} darkMode={darkReadingMode} />

          <div
            className={`rounded-xl border p-5 ${
              darkReadingMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}
          >
            <h3 className={`font-dfaalt text-lg mb-2 ${darkReadingMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Want more tactical guides?
            </h3>
            <p className={`text-sm mb-3 ${darkReadingMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Join the list for practical ops insights and new playbooks.
            </p>
            {activeCta.external ? (
              <a
                href={activeCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('cta_click', {
                    event_category: 'blog_conversion',
                    event_label: `${post.slug}:${post.ctaType}`,
                  })
                }
                className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  darkReadingMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {activeCta.label}
              </a>
            ) : (
              <Link
                to={activeCta.href}
                onClick={() =>
                  trackEvent('cta_click', {
                    event_category: 'blog_conversion',
                    event_label: `${post.slug}:${post.ctaType}`,
                  })
                }
                className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  darkReadingMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {activeCta.label}
              </Link>
            )}
          </div>
        </section>

        <aside className="hidden lg:block space-y-5 lg:sticky lg:top-24 h-max">
          <div
            className={`rounded-xl border p-4 ${
              darkReadingMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}
          >
            <h3 className={`font-dfaalt text-lg mb-3 ${darkReadingMode ? 'text-gray-100' : 'text-gray-900'}`}>
              On this page
            </h3>
            <ul className={`space-y-1.5 text-sm ${darkReadingMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-3' : ''}>
                  <a
                    href={`#${heading.id}`}
                    className={`block rounded-md px-2 py-1.5 transition-colors ${
                      heading.id === activeHeadingId
                        ? darkReadingMode
                          ? 'bg-gray-800 text-blue-300'
                          : 'bg-primary-50 text-primary-700'
                        : darkReadingMode
                          ? 'hover:bg-gray-800 hover:text-blue-300'
                          : 'hover:bg-gray-100 hover:text-primary-600'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <BlogShareBar title={post.title} url={articleUrl} darkMode={darkReadingMode} />

          <div
            className={`rounded-xl border p-5 ${
              darkReadingMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
            }`}
          >
            <h3 className={`font-dfaalt text-lg mb-2 ${darkReadingMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Want more tactical guides?
            </h3>
            <p className={`text-sm mb-3 ${darkReadingMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Join the list for practical ops insights and new playbooks.
            </p>
            {activeCta.external ? (
              <a
                href={activeCta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('cta_click', {
                    event_category: 'blog_conversion',
                    event_label: `${post.slug}:${post.ctaType}`,
                  })
                }
                className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  darkReadingMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {activeCta.label}
              </a>
            ) : (
              <Link
                to={activeCta.href}
                onClick={() =>
                  trackEvent('cta_click', {
                    event_category: 'blog_conversion',
                    event_label: `${post.slug}:${post.ctaType}`,
                  })
                }
                className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  darkReadingMode
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {activeCta.label}
              </Link>
            )}
          </div>
        </aside>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="font-dfaalt text-3xl text-gray-900 mb-5">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                to={`/blog/${related.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-semibold text-primary-600 mb-2">{related.funnelStage}</p>
                <p className="font-dfaalt text-xl text-gray-900 mb-2 leading-tight">
                  {related.title}
                </p>
                <p className="text-sm text-gray-700">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

