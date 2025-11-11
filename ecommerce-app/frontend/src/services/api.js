import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

// Products
export const fetchProducts = async () => {
    const res = await axios.get(`${API_BASE}/products`);
    return res.data;
};

export const fetchProductById = async (id) => {
    const res = await axios.get(`${API_BASE}/products/${id}`);
    return res.data;
};

// Orders
export const placeOrder = async (order) => {
    const res = await axios.post(`${API_BASE}/orders/place`, order);
    return res.data;
};

export const fetchAllOrders = async () => {
    const res = await axios.get(`${API_BASE}/orders`);
    return res.data;
};

// Promo codes
export const validatePromoCode = async (code) => {
    const res = await axios.get(`${API_BASE}/promo/validate/${code}`);
    return res.data;
};
