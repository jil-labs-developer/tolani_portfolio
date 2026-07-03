import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CanvasRoute } from './routes/CanvasRoute';

const LEGACY_REDIRECTS: Record<string, string> = {
  '/1': '/',
  '/2': '/iheart',
  '/3': '/knot',
  '/4': '/ehr',
  '/5': '/about',
};

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CanvasRoute slug="home" />} />
        <Route path="iheart" element={<CanvasRoute slug="iheart" />} />
        <Route path="knot" element={<CanvasRoute slug="knot" />} />
        <Route path="ehr" element={<CanvasRoute slug="ehr" />} />
        <Route path="about" element={<CanvasRoute slug="about" />} />
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
