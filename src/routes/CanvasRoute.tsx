import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { fetchCanvasBundle } from '../canvas-data';
import { ReadymagCanvas } from '../components/ReadymagCanvas';

export function CanvasRoute({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['canvas', slug],
    queryFn: () => fetchCanvasBundle(slug),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isError) return <Navigate to="/" replace />;
  if (isLoading || !data) return null;
  return <ReadymagCanvas bundle={data} />;
}
