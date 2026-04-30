import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEOHead from '../components/SEOHead';
import type { BlogDbPost, BlogStatus } from '../types/blog';
import {
  createDraftPost,
  getAdminPostById,
  getCurrentBlogRole,
  listRevisions,
  parseClaudePost,
  transitionPostStatus,
  updateDraftPost,
  upsertLinkChecks,
  validatePost,
  validatePostServer,
} from '../services/blogAdminService';

const emptyPost: Partial<BlogDbPost> = {
  title: '',
  slug: '',
  excerpt: '',
  bodyMarkdown: '',
  tldrShort: '',
  tldrBullets: [],
  rariSummaryModes: { quick: '', operator: '', investor: '' },
  primaryKeyword: '',
  secondaryKeywords: [],
  searchIntent: 'informational',
  funnelStage: 'TOFU',
  category: '',
  tags: [],
  author: {
    name: 'Gregory Ringler',
    role: 'Founder & CEO',
    bio: '',
  },
  metaTitle: '',
  metaDescription: '',
  ctaType: 'newsletter',
  ctaCopy: '',
  status: 'draft',
};

const nextStatusByRole: Record<'author' | 'editor' | 'admin', BlogStatus[]> = {
  author: ['draft', 'in_review', 'archived'],
  editor: ['draft', 'in_review', 'approved', 'published', 'archived'],
  admin: ['draft', 'in_review', 'approved', 'published', 'archived'],
};

export default function AdminBlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [post, setPost] = useState<Partial<BlogDbPost>>(emptyPost);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [rawImport, setRawImport] = useState('');
  const [role, setRole] = useState<'author' | 'editor' | 'admin'>('author');
  const [issues, setIssues] = useState<Array<{ field: string; level: string; message: string }>>(
    []
  );
  const [revisions, setRevisions] = useState<any[]>([]);

  useEffect(() => {
    void getCurrentBlogRole().then((r) => setRole(r ?? 'author')).catch(() => setRole('author'));
  }, []);

  useEffect(() => {
    if (isNew || !id) {
      return;
    }

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const fetched = await getAdminPostById(id);
        if (!fetched) {
          setError('Post not found.');
          return;
        }
        setPost(fetched);
        const revisionRows = await listRevisions(id);
        setRevisions(revisionRows);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [id, isNew]);

  const parsedStatusOptions = useMemo(() => nextStatusByRole[role], [role]);

  const runValidation = async () => {
    setError('');
    const localResult = await validatePost(post, { excludePostId: isNew ? undefined : id });
    const serverResult = await validatePostServer(post, isNew ? undefined : id);
    const result = serverResult ?? localResult;
    setIssues(result.validation.issues);
    if (!isNew && id) {
      await upsertLinkChecks(id, result.links);
    }
    return result;
  };

  const onImport = () => {
    try {
      const parsed = parseClaudePost(rawImport);
      setPost((current) => ({
        ...current,
        ...parsed,
      }));
      setNotice('Claude markdown parsed successfully.');
    } catch (e) {
      setError(`Failed to parse import: ${(e as Error).message}`);
    }
  };

  const onSave = async () => {
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const { validation, links } = await runValidation();
      if (!validation.isValid) {
        setError('Fix validation errors before saving.');
        return;
      }

      if (isNew) {
        const created = await createDraftPost(post);
        await upsertLinkChecks(created.id, links);
        setNotice('Draft created.');
        navigate(`/admin/blog/${created.id}/edit`, { replace: true });
      } else if (id) {
        const updated = await updateDraftPost(id, post, 'Admin editor save');
        await upsertLinkChecks(updated.id, links);
        setPost(updated);
        setNotice('Draft updated.');
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const onTransition = async (nextStatus: BlogStatus) => {
    if (isNew || !id) {
      return;
    }
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const { validation } = await runValidation();
      if (!validation.isValid && nextStatus === 'published') {
        setError('Cannot publish while validation errors exist.');
        return;
      }

      const updated = await transitionPostStatus(id, nextStatus, 'Status update from admin portal');
      setPost(updated);
      setNotice(`Status updated to ${nextStatus}.`);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-10">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead title="Blog Editor | Exotiq" description="Create and edit blog posts." noindex />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Admin Blog Editor</p>
            <h1 className="font-dfaalt text-3xl text-gray-900">
              {isNew ? 'Create New Draft' : post.title || 'Edit Draft'}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/blog"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Back to list
            </Link>
            <button
              onClick={() => void runValidation()}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            >
              Validate
            </button>
            <button
              onClick={() => void onSave()}
              disabled={saving}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}
        {notice ? (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{notice}</div>
        ) : null}

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Paste Claude post format</p>
          <textarea
            value={rawImport}
            onChange={(event) => setRawImport(event.target.value)}
            className="w-full min-h-40 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            placeholder="Paste full Claude markdown with metadata block..."
          />
          <button
            onClick={onImport}
            className="mt-3 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black"
          >
            Parse and populate fields
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={post.title ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, title: event.target.value }))}
                placeholder="Title"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2"
              />
              <input
                value={post.slug ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, slug: event.target.value }))}
                placeholder="Slug"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                value={post.category ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, category: event.target.value }))}
                placeholder="Category"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                value={post.primaryKeyword ?? ''}
                onChange={(event) =>
                  setPost((current) => ({ ...current, primaryKeyword: event.target.value }))
                }
                placeholder="Primary keyword"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                value={(post.tags ?? []).join(', ')}
                onChange={(event) =>
                  setPost((current) => ({
                    ...current,
                    tags: event.target.value
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  }))
                }
                placeholder="Tags (comma-separated)"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <textarea
                value={post.excerpt ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, excerpt: event.target.value }))}
                placeholder="Excerpt"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2 min-h-20"
              />
              <input
                value={post.metaTitle ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, metaTitle: event.target.value }))}
                placeholder="Meta title"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                value={post.metaDescription ?? ''}
                onChange={(event) =>
                  setPost((current) => ({ ...current, metaDescription: event.target.value }))
                }
                placeholder="Meta description"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                value={post.canonicalUrl ?? ''}
                onChange={(event) =>
                  setPost((current) => ({ ...current, canonicalUrl: event.target.value }))
                }
                placeholder="Canonical URL"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2"
              />
              <textarea
                value={post.tldrShort ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, tldrShort: event.target.value }))}
                placeholder="TLDR short"
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:col-span-2 min-h-20"
              />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Body markdown</p>
              <textarea
                value={post.bodyMarkdown ?? ''}
                onChange={(event) => setPost((current) => ({ ...current, bodyMarkdown: event.target.value }))}
                placeholder="Full markdown article body..."
                className="w-full min-h-[420px] rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Workflow</p>
              <p className="text-xs text-gray-500 mb-3">
                Current status: <span className="font-semibold uppercase">{post.status ?? 'draft'}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {parsedStatusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => void onTransition(status)}
                    disabled={saving || isNew || post.status === status}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Validation issues</p>
              {issues.length === 0 ? (
                <p className="text-sm text-gray-500">No issues yet. Run validation.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {issues.map((issue, index) => (
                    <li
                      key={`${issue.field}-${index}`}
                      className={`rounded-md px-2 py-1 ${
                        issue.level === 'error'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span className="font-semibold">{issue.field}: </span>
                      {issue.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Revision history</p>
              {revisions.length === 0 ? (
                <p className="text-sm text-gray-500">No revisions recorded yet.</p>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  {revisions.slice(0, 8).map((revision) => (
                    <li key={revision.id} className="rounded-md border border-gray-100 px-2 py-1">
                      <p className="font-semibold">{revision.change_note || 'Update'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(revision.edited_at).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">Live markdown preview</p>
              <div className="max-h-[420px] overflow-y-auto prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.bodyMarkdown ?? ''}
                </ReactMarkdown>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
