import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import PostCard from './PostCard';
import PostModal from './PostModal';

import car from '../assets/home_cate_cars.png';
import property from '../assets/home_cate_properties.png';
import electronics from '../assets/home_cate_electronics.png';
import tools from '../assets/home_cate_tools.png';
import furniture from '../assets/home_cate_furniture.png';
import bike from '../assets/home_cate_bikes.png';
import clothes from '../assets/home_cate_clothes.png';
import helicopter from '../assets/home_cate_helicopter.png';

const Rental = () => {
  const rentalCategories = [
    { id: 1, title: 'Cars', image: car },
    { id: 2, title: 'Properties', image: property },
    { id: 3, title: 'Electronics', image: electronics },
    { id: 4, title: 'Tools', image: tools },
    { id: 5, title: 'Furniture', image: furniture },
    { id: 6, title: 'Bikes', image: bike },
    { id: 7, title: 'Clothes', image: clothes },
    { id: 8, title: 'Helicopter', image: helicopter },
  ];

  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recomented_posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: 1 }),
        });
        const data = await response.json();
        if (data.data) {
          setRecommendedPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching recommended posts:', error);
      }
    };
    fetchRecommendedPosts();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <div className="container p-4">
      <Carousel categories={rentalCategories} />
      <h3 className="ml-5 mb-4">Recommended Posts</h3>
      <div className="row">
        {recommendedPosts.length > 0 ? (
          recommendedPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handleCardClick} />
          ))
        ) : (
          <p>No recommended posts available.</p>
        )}
      </div>

      <PostModal show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </div>
  );
};

export default Rental;
