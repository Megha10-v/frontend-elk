import React from 'react';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';

import cleaning from '../assets/ic_cleaning_service.png';
import repairing from '../assets/ic_repairing_service.png';
import painting from '../assets/ic_painting_service.png';
import plumbing from '../assets/ic_plumbing_service.png';
import electricain from '../assets/ic_electrician_service.png';
import carpentry from '../assets/ic_carpentry_service.png';
import laundry from '../assets/ic_laudery_service.png';
import salon from '../assets/ic_saloon_service.png'
import PostCard from './PostCard';
import PostModal from './PostModal';

const Service = () => {

    const serviceCategories = [
        { id: 1, title: 'Cleaning', image: cleaning  },
        { id: 2, title: 'Repairing', image: repairing },
        { id: 3, title: 'Painting', image: painting },
        { id: 4, title: 'Plumbing', image: plumbing },
        { id: 5, title: 'Electrician', image: electricain },
        { id: 6, title: 'Carpentry', image: carpentry },
        { id: 7, title: 'Laundry', image: laundry },
        { id: 8, title: 'Salon', image: salon },
      ];

    const [bestProvidersPosts, setbestProvidersPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
          const fetchBestProvidersPosts = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/best_service_providers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1 }),
              });
              const data = await response.json();
              if (data.data) {
                setbestProvidersPosts(data.data);
              }
            } catch (error) {
              console.error('Error fetching recommended posts:', error);
            }
          };
          fetchBestProvidersPosts();
        }, []);
      
    const handleCardClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };
return (
      <div className="container p-4" >
        <Carousel categories={serviceCategories} />
        <h3 className="ml-5 mb-4">Best Service Providers</h3>
      <div className="row">
        {bestProvidersPosts.length > 0 ? (
          bestProvidersPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handleCardClick} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>

      <PostModal show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
      </div>
    );
}

export default Service
