import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SetGoldRatePage from './pages/SetGoldRatePage';
import UploadProductPage from './pages/UploadProductPage';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<SetGoldRatePage />} />
        <Route path="upload" element={<UploadProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
