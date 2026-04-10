import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => (
  <button type={type} onClick={onClick} className={`px-4 py-2 rounded shadow ${className}`}>
    {children}
  </button>
);

export default Button;
