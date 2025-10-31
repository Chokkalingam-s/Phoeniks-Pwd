import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SchemesList from './pages/SchemesList';
import Resources from './pages/Resources';
import OrganizationSearch from './pages/OrganizationSearch';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schemes" element={<SchemesList />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/organizations" element={<OrganizationSearch />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
