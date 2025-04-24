import React from 'react';
import useGoldRateContext from '../hooks/useGoldRateContext';
import UserImage from '../assets/user.jpg';
import { FiMenu } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const { rates, loading } = useGoldRateContext();
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <nav className="rounded bg-white mb-3 p-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        {/* Hamburger (visible only on mobile) */}
        <button
          className="btn btn-outline-primary me-3 d-md-none"
          onClick={toggleSidebar}
        >
          <FiMenu size={20} />
        </button>

        {!loading ? (
         <div className="text-muted small text-md-body text-nowrap fw-semibold d-flex flex-wrap align-items-center">
         <div className="me-2">Gold Price:</div>
         <div className="me-3 small-on-mobile">
           24k: <span className="text-primary">₹{rates['24k']?.ratePerGram || '-'}</span>
         </div>
         <div className="me-3 small-on-mobile">
           22k: <span className="text-primary">₹{rates['22k']?.ratePerGram || '-'}</span>
         </div>
         <div className="small-on-mobile">
           18k: <span className="text-primary">₹{rates['18k']?.ratePerGram || '-'}</span>
         </div>
       </div>
        ) : (
          <div className="text-muted small">Loading gold rates...</div>
        )}
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="small text-muted fw-bold d-none d-md-block">
          Date: <span className="text-primary me-3">{formattedDate}</span>
        </div>
        <img
          src={UserImage}
          alt="User"
          className="rounded-circle"
          style={{ width: '30px', height: '30px', objectFit: 'cover' }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
