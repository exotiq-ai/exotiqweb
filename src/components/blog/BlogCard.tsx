import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogDbPost, BlogPost } from '../../types/blog';
import { formatTaxonomyLabel, getReadingTimeFromContent } from '../../lib/blog';

interface BlogCardProps {
  post: BlogPost | BlogDbPost;
}

const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function BlogCard({ post }: BlogCardProps) {
  const readingTime =
    'readingTimeMinutes' in post
      ? post.readingTimeMinutes
      : getReadingTimeFromContent(post.bodyMarkdown);

  return (
    <article className="group rounded-2xl border border-white/10 bg-dark-800 p-6 shadow-sm hover:shadow-lg hover:shadow-black/30 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center gap-2 text-xs font-semibold mb-4">
        <span className="rounded-full bg-primary-500/10 text-primary-300 px-2.5 py-1">
          {post.funnelStage}
        </span>
        <span className="rounded-full bg-white/5 text-gray-400 px-2.5 py-1">
          {formatTaxonomyLabel(post.category)}
        </span>
      </div>

      <h2 className="font-dfaalt text-2xl text-white mb-3 leading-tight tracking-tight">
        <Link to={`/blog/${post.slug}`} className="hover:text-primary-400 transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="font-inter text-gray-400 mb-5 leading-7">{post.excerpt}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-5 border-t border-white/10 pt-4">
        <span>{formatDate(post.publishDate)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {readingTime} min read
        </span>
      </div>

      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 transition-colors"
      >
        Read article
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
