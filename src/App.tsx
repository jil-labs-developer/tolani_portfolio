import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './routes/Home';
import { AboutPage } from './routes/About';
import { CaseStudyPage } from './routes/CaseStudy';

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
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path=":slug" element={<CaseStudyPage />} />
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
