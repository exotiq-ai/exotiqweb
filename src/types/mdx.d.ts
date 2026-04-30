declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { BlogFrontmatter } from './blog';

  export const metadata: BlogFrontmatter;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}

