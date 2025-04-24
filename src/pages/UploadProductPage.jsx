import React, { useState, useRef } from "react";
import { uploadProduct } from "../api/productApi";

export default function UploadProductPage() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    shortdiscription: "",
    karat: "",
    weight: "",
    makingCost: "",
    wastage: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shortdiscription: "",
      karat: "",
      weight: "",
      makingCost: "",
      wastage: "",
      image: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productForm = new FormData();
    productForm.append("name", formData.name);
    productForm.append('shortdiscription', formData.shortdiscription);
    productForm.append("karat", formData.karat);
    productForm.append("weight", formData.weight);
    productForm.append("makingCostPercent", formData.makingCost);
    productForm.append("wastagePercent", formData.wastage);
    if (formData.image) {
      productForm.append("image", formData.image);
    }

    try {
      const res = await uploadProduct(productForm);
      console.log("Upload response:", res.data);
      if (res.data && res.data._id) {
        alert("Product uploaded successfully!");
        resetForm();
      } else {
        alert("❌Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="py-5 px-4">
      <div className="container bg-white p-4 rounded shadow">
        <h2 className="fw-bold mb-4">Add Product</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
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
              placeholder="e.g. Gold Necklace"
            />
          </div>
          <div className="col-md-6">
            <label
              htmlFor="shortdiscription"
              className="form-label fw-semibold"
            >
              Short Description
            </label>
            <input
              type="text"
              className="form-control"
              id="shortdiscription"
              name="shortdiscription"
              value={formData.shortdiscription}
              onChange={handleChange}
              placeholder="e.g. Elegant handcrafted design"
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
              className="form-control"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g. 5.2"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="makingCost" className="form-label fw-semibold">
              Making Cost (%)
            </label>
            <input
              type="number"
              className="form-control"
              id="makingCost"
              name="makingCost"
              value={formData.makingCost}
              onChange={handleChange}
              placeholder="e.g. 10"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="wastage" className="form-label fw-semibold">
              Wastage (%)
            </label>
            <input
              type="number"
              className="form-control"
              id="wastage"
              name="wastage"
              value={formData.wastage}
              onChange={handleChange}
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
              onChange={handleChange}
              ref={fileInputRef}
            />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary me-2 px-4">
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
