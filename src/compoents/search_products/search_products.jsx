import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './search_products.css'
import { toast } from 'react-toastify';
const search_products = () => {
    const Navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
    
                const response = await axios.get(`http://localhost:5858/api/users/search?q=${searchQuery}`);
                toast.success(searchQuery)
                setProducts(response.data.data);
            } catch (error) {
                toast.error("Please enter any value of search bar.")
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, [searchQuery]);

    return (

        <div id="Home-container">
            <div id="le">
                    {loading && (
                        <div id="loading-container">
                            <div id="loading-spinner"></div>
                            <p>Loading...</p>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                </div>
            <div id="product_container">
                
                <div id="product-details">
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <strong>{product.name}</strong>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                {product.imageUrl && (
                                    <img src={product.imageUrl} alt={product.name} />
                                )}
                                <div id="button-vh">
                                <button  onClick={() => Navigate('/view',{ state: product })}>View More</button>
                               
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>
            </div>
        </div>
    );
};

export default search_products;
