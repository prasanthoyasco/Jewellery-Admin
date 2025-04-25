import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SetGoldRatePage from './pages/SetGoldRatePage';
import DashboardLayout from './components/DashboardLayout';
import ProductListPage from './pages/ProductListPage';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<SetGoldRatePage />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="allproduct" element={<ProductListPage />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
