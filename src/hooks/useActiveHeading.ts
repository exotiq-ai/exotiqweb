import { useEffect, useMemo, useState } from 'react';
import type { BlogHeading } from '../types/blog';

const TOP_OFFSET_PX = 140;

export function useActiveHeading(headings: BlogHeading[]) {
  const headingIds = useMemo(
    () => headings.map((heading) => heading.id).filter(Boolean),
    [headings]
  );
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  useEffect(() => {
    if (headingIds.length === 0) {
      return;
    }

    const onScroll = () => {
      let currentId = headingIds[0];

      headingIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;
        if (top <= TOP_OFFSET_PX) {
          currentId = id;
        }
      });

      setActiveHeadingId(currentId);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headingIds]);

  return activeHeadingId;
}

