import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsbyid } from '../api/productApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    shortdiscription: '',
    productid:"",
    karat: '',
    weight: '',
    makingCostPercent: '',
    wastagePercent: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(''); // State for file type error

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductsbyid(id);
        setFormData({
          name: res.data.name || '',
          shortdiscription: res.data.shortdiscription || '',
          productid: res.data.productid || '',
          karat: res.data.karat || '',
          weight: res.data.weight || '',
          makingCostPercent: res.data.makingCostPercent || '',
          wastagePercent: res.data.wastagePercent || '',
          image: null,
        });
        setPreview(res.data.image);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFileError(''); 

    if (name === 'image' && files && files[0]) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (allowedTypes.includes(files[0].type)) {
        setPreview(URL.createObjectURL(files[0]));
        setFormData((prev) => ({ ...prev, image: files[0] }));
      } else {
        setFileError('Please upload a valid image file (JPEG, PNG, GIF, or WebP).');
        setPreview(preview); // Keep the previous preview
        setFormData((prev) => ({ ...prev, image: null }));
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the invalid file selection
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      shortdiscription: '',
      karat: '',
      weight: '',
      makingCostPercent: '',
      wastagePercent: '',
      image: null,
    });
    setPreview(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      await axios.put(`/api/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      resetForm();
      navigate('/allproduct');
    } catch (err) {
      console.error('Update failed', err);
      alert('❌ Update failed. Please try again.');
    }
  };

  return (
    <div className="py-5 px-4">
      <div className="container bg-white p-4 rounded shadow">
        <h2 className="fw-bold mb-4">Edit Product</h2>

        <form className="row g-3" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label fw-semibold">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Gold Necklace"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="shortdiscription" className="form-label fw-semibold">
              Short Description
            </label>
            <input
              type="text"
              className="form-control"
              id="shortdiscription"
              name="shortdiscription"
              value={formData.shortdiscription}
              onChange={handleChange}
              required
              placeholder="e.g. Elegant handcrafted design"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="productid" className="form-label fw-semibold">
              Product ID
            </label>
            <input
              type="text"
              className="form-control"
              id="productid"
              name="productid"
              value={formData.productid}
              onChange={handleChange}
              readOnly
              disabled
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="karat" className="form-label fw-semibold">
              Karat
            </label>
            <select
              id="karat"
              name="karat"
              className="form-select"
              value={formData.karat}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select karat
              </option>
              <option value="24k">24k</option>
              <option value="22k">22k</option>
              <option value="18k">18k</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="weight" className="form-label fw-semibold">
              Weight (grams)
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              placeholder="e.g. 5.2"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="makingCostPercent" className="form-label fw-semibold">
              Making Cost (%)
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="makingCostPercent"
              name="makingCostPercent"
              value={formData.makingCostPercent}
              onChange={handleChange}
              required
              placeholder="e.g. 10"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="wastagePercent" className="form-label fw-semibold">
              Wastage (%)
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="wastagePercent"
              name="wastagePercent"
              value={formData.wastagePercent}
              onChange={handleChange}
              required
              placeholder="e.g. 2"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="image" className="form-label fw-semibold">
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleChange}
              ref={fileInputRef}
            />
            {fileError && <div className="text-danger">{fileError}</div>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                width="100"
                className="mt-2 rounded"
              />
            )}
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary me-2 px-4">
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/allproduct')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;