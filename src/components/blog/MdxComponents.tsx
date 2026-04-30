import type { MDXComponents } from 'mdx/types';
import type { ReactNode, ReactElement } from 'react';
import { slugifyBlogText } from '../../lib/blog';

const flattenText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(flattenText).join(' ');
  }

  if (typeof node === 'object' && 'props' in node) {
    return flattenText((node as ReactElement).props.children);
  }

  return '';
};

const headingId = (children: ReactNode): string => {
  const rawText = flattenText(children).trim();
  return rawText ? slugifyBlogText(rawText) : '';
};

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={headingId(children)}
      className="mdx-h2 font-dfaalt text-2xl md:text-3xl mt-10 mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={headingId(children)}
      className="mdx-h3 font-dfaalt text-xl md:text-2xl mt-8 mb-3 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mdx-p font-inter leading-8 mb-5">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mdx-ul list-disc pl-6 mb-6 space-y-2 font-inter">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mdx-ol list-decimal pl-6 mb-6 space-y-2 font-inter">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mdx-li leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mdx-blockquote border-l-4 px-4 py-3 mb-6 italic rounded-r-lg">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="mdx-a underline underline-offset-4 font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="mdx-code rounded px-1.5 py-0.5 text-sm font-mono">
      {children}
    </code>
  ),
  hr: () => <hr className="mdx-hr my-10" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="mdx-table w-full border-collapse border text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="mdx-thead">{children}</thead>,
  th: ({ children }) => (
    <th className="mdx-th border px-3 py-2 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="mdx-td border px-3 py-2">{children}</td>
  ),
};

