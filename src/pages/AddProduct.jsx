import React, { useState, useRef } from "react";
import { AddNewProduct } from "../api/productApi";

export default function AddProduct() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState(""); // State for file type error

  const [formData, setFormData] = useState({
    name: "",
    shortdiscription: "",
    productid: "",
    karat: "",
    weight: "",
    makingCost: "",
    wastage: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFileError(""); // Clear any previous error

    if (name === "image" && files && files[0]) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (allowedTypes.includes(files[0].type)) {
        setPreview(URL.createObjectURL(files[0]));
        setFormData((prev) => ({ ...prev, image: files[0] }));
      } else {
        setFileError("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
        setPreview(null);
        setFormData((prev) => ({ ...prev, image: null }));
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the invalid file selection
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      shortdiscription: "",
      productid: "",
      karat: "",
      weight: "",
      makingCost: "",
      wastage: "",
      image: null,
    });
    setPreview(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productForm = new FormData();
    productForm.append("name", formData.name);
    productForm.append("shortdiscription", formData.shortdiscription);
    productForm.append("productid", formData.productid);
    productForm.append("karat", formData.karat);
    productForm.append("weight", formData.weight);
    productForm.append("makingCostPercent", formData.makingCost);
    productForm.append("wastagePercent", formData.wastage);
    if (formData.image) {
      productForm.append("image", formData.image);
    }

    try {
      const res = await AddNewProduct(productForm);
      console.log("Upload response:", res.data);
      if (res.data && res.data._id) {
        alert("Product uploaded successfully!");
        resetForm();
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
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
              placeholder="e.g. P1010"
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
              placeholder="e.g. 10.25"
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
              placeholder="e.g. 2.5"
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
              accept="image/jpeg, image/png, image/gif, image/webp"
            />
            {fileError && <div className="text-danger">{fileError}</div>}
            {preview && (
              <img
                src={preview}
                alt="Image Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
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