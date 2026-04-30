import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, RefreshCw } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import type { BlogDbPost, BlogStatus } from '../types/blog';
import { getCurrentBlogRole, listAdminPosts } from '../services/blogAdminService';

const statusTabs: Array<{ label: string; value?: BlogStatus }> = [
  { label: 'All' },
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogDbPost[]>([]);
  const [activeStatus, setActiveStatus] = useState<BlogStatus | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState<'author' | 'editor' | 'admin' | null>(null);

  const load = async (status?: BlogStatus) => {
    setLoading(true);
    setError('');
    try {
      const data = await listAdminPosts(status);
      setPosts(data);
      const userRole = await getCurrentBlogRole();
      setRole(userRole);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(activeStatus);
  }, [activeStatus]);

  const postCountLabel = useMemo(() => `${posts.length} posts`, [posts.length]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title="Admin Blog Portal | Exotiq"
        description="Manage Exotiq blog drafts, reviews, approvals, and publishing."
        noindex
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-dfaalt text-4xl text-gray-900">Blog Admin Portal</h1>
            <p className="text-gray-600 mt-2">
              Editorial workflow for draft, review, approval, and publishing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void load(activeStatus)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              <Plus className="w-4 h-4" />
              New Draft
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          Signed in as <span className="font-semibold uppercase">{role ?? 'author'}</span> • {postCountLabel}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveStatus(tab.value)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                activeStatus === tab.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        ) : null}

        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 text-gray-700 font-semibold">Title</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Slug</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Updated</th>
                <th className="px-4 py-3 text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-gray-500" colSpan={5}>
                    Loading...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-gray-500" colSpan={5}>
                    No posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-gray-900">{post.title}</td>
                    <td className="px-4 py-3 text-gray-600">{post.slug}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold uppercase text-gray-700">
                        {post.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(post.updatedDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/blog/${post.id}/edit`}
                        className="text-primary-600 font-semibold hover:text-primary-700"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
