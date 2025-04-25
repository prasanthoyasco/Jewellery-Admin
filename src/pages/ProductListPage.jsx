import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const itemsPerPage = 5; // You can adjust the number of items per page

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product.", err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredProducts = products.filter((product) =>
    product.productid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-4 bg-white p-4 rounded shadow">
      <h2 className="fw-bold mb-4">Product List</h2>

      <div className="mb-3">
  <div className="input-group">
  <span className="input-group-text" id="search-icon">
      <i className="bi bi-search"></i>
    </span>
    <input
      type="text"
      className="form-control"
      placeholder="Search by Product ID"
      value={searchTerm}
      onChange={handleSearch}
      aria-describedby="search-icon"
    />
  </div>
</div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading products...</span>
        </div>
      ) : currentProducts.length === 0 && searchTerm ? (
        <p>No products found with Product ID: {searchTerm}</p>
      ) : currentProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Karat</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p) => (
                <tr key={p._id}>
                  <td>{p.productid}</td>
                  <td>{p.name}</td>
                  <td>{p.karat}</td>
                  <td>{p.weight}g</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/edit-product/${p._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Product pagination">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}