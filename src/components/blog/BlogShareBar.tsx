import { Copy, Check, Linkedin, Share2 } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '../Analytics';

interface BlogShareBarProps {
  title: string;
  url: string;
  darkMode?: boolean;
}

export default function BlogShareBar({ title, url, darkMode = false }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  const onCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    trackEvent('share_copy_link', {
      event_category: 'blog_engagement',
      event_label: title,
    });
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={`rounded-xl border p-4 md:p-5 ${
        darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      }`}
    >
      <p className={`font-dfaalt text-sm mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        <Share2 className="w-4 h-4" />
        Share this article
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm ${
              darkMode
                ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            } transition-all duration-200 hover:-translate-y-0.5`}
            onClick={() =>
              trackEvent('share_click', {
                event_category: 'blog_engagement',
                event_label: `${title}:${link.name}`,
              })
            }
          >
            {link.icon ? <link.icon className="w-4 h-4" /> : null}
            {link.name}
          </a>
        ))}

        <button
          onClick={onCopy}
          className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm ${
            darkMode
              ? 'border-gray-700 text-gray-200 hover:bg-gray-800'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          } transition-all duration-200 hover:-translate-y-0.5`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}

