import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HospitalDashboard } from './pages/HospitalDashboard';
import { PartnerDashboard } from './pages/PartnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/general" replace />} />
          <Route path="general" element={<HospitalDashboard />} />
          <Route path="partner" element={<PartnerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
