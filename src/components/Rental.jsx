// import React from 'react';
// import Carousel from './Carousel'; // Import the common component

// import car from '../assets/home_cate_cars.png';
// import property from '../assets/home_cate_properties.png';
// import electronics from '../assets/home_cate_electronics.png';
// import tools from '../assets/home_cate_tools.png';
// import furniture from '../assets/home_cate_furniture.png';
// import bike from '../assets/home_cate_bikes.png';
// import clothes from '../assets/home_cate_clothes.png';
// import helicopter from '../assets/home_cate_helicopter.png';

// const Rental = () => {
//   const rentalCategories = [
//     { id: 1, title: 'Cars', image: car },
//     { id: 2, title: 'Properties', image: property },
//     { id: 3, title: 'Electronics', image: electronics },
//     { id: 4, title: 'Tools', image: tools },
//     { id: 5, title: 'Furniture', image: furniture },
//     { id: 6, title: 'Bikes', image: bike },
//     { id: 7, title: 'Clothes', image: clothes },
//     { id: 8, title: 'Helicopter', image: helicopter },
//   ];

//   return (
//     <div>
//       <Carousel categories={rentalCategories} />
//       <h1>Recomended Post</h1>
//     </div>
//   );
// };

// export default Rental;

import React, { useState, useEffect } from 'react';
import Carousel from './Carousel'; // Import the common component

import car from '../assets/home_cate_cars.png';
import property from '../assets/home_cate_properties.png';
import electronics from '../assets/home_cate_electronics.png';
import tools from '../assets/home_cate_tools.png';
import furniture from '../assets/home_cate_furniture.png';
import bike from '../assets/home_cate_bikes.png';
import clothes from '../assets/home_cate_clothes.png';
import helicopter from '../assets/home_cate_helicopter.png';

import './Rental.css'

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

  useEffect(() => {
    // Fetch the data using POST method
    const fetchRecommendedPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recomented_posts', {
          method: 'POST', // Specify POST method
          headers: {
            'Content-Type': 'application/json', // Set content type
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTczMjA5MjU5Mzg0Njg5MCwiaWF0IjoxNzMyMDkyNTkzfQ.enWegT0LQ-xIjpL6e9sWtvzyXm58xERvxEQ0K7eN-dE'
          },
          body: JSON.stringify({ page: 1 }), // Include any necessary payload
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

  return (
    <div>
      <Carousel categories={rentalCategories} />
      <h3 style={{marginLeft:'20px'}}>Recommended Posts</h3>
      <div className="recommended-posts">
        {recommendedPosts.length > 0 ? (
          recommendedPosts.map((post) => (
            <div key={post.id} className="recommended-post-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
              {/* Post Image */}
              {post.ad_images && post.ad_images.length > 0 && (
                <img
                  src={post.ad_images[0].image}
                  alt={post.title}
                  style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '5px' }}
                />
              )}

              {/* Post Details */}
              <h2>{post.title}</h2>
              <p><strong>Category:</strong> {post.category}</p>
              <p><strong>Description:</strong> {post.description}</p>
              <p><strong>Price:</strong> {post.ad_price_details[0]?.rent_price || 'N/A'} per {post.ad_price_details[0]?.rent_duration || ''}</p>
              <p>
                <strong>Location:</strong>{' '}
                {`${post.ad_location.locality || ''}, ${post.ad_location.district}, ${post.ad_location.state}, ${post.ad_location.country}`}
              </p>
            </div>
          ))
        ) : (
          <p>No recommended posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Rental;

