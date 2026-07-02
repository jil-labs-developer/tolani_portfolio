import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollSpyContextValue {
  activeId: string;
  register: (id: string, el: HTMLElement | null) => void;
}

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function ScrollSpyProvider({ ids, children }: { ids: string[]; children: ReactNode }) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');
  const elements = useRef(new Map<string, HTMLElement>());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).dataset.sectionId;
          if (id) setActiveId(id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    const current = observer.current;
    elements.current.forEach((el) => current.observe(el));
    return () => current.disconnect();
  }, [ids]);

  const register = (id: string, el: HTMLElement | null) => {
    if (el) {
      el.dataset.sectionId = id;
      elements.current.set(id, el);
      observer.current?.observe(el);
    }
  };

  return <ScrollSpyContext.Provider value={{ activeId, register }}>{children}</ScrollSpyContext.Provider>;
}

export function useScrollSpy() {
  const ctx = useContext(ScrollSpyContext);
  if (!ctx) throw new Error('useScrollSpy must be used within ScrollSpyProvider');
  return ctx;
}
