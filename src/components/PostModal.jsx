import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostModal = ({ show, onHide, post }) => {
  
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  if (!post) return null;
  

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post.ad_images && post.ad_images.length > 1 ? (
          <Carousel>
            {post.ad_images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image.image}
                  alt={`Image ${index + 1}`}
                  className="d-block w-100"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src={post.ad_images[0]?.image}
            alt={post.title}
            className="img-fluid rounded mb-3"
            style={{ height: '250px', objectFit: 'cover' }}
          />
        )}


        <p className="card-text text-muted fs-6" style={{ fontFamily: 'Arial, sans-serif' }}>
               Post ID: {post.id}
        </p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Description:</strong> {post.description}</p>
        <p><strong>Price:</strong> {post.ad_price_details[0]?.rent_price || 'N/A'} per {post.ad_price_details[0]?.rent_duration || ''}</p>
        <p><i className="fa-solid fa-location-dot"></i> {`${post.ad_location.locality || ''}, ${post.ad_location.district}, ${post.ad_location.state}, ${post.ad_location.country}`}</p>
        <div className="d-flex justify-content-between mt-3">

            {isAuthenticated?(<button
            style={{
                border: 'none', 
                backgroundColor: 'transparent', 
                padding: '0',
                cursor: 'pointer'}} >
            <i className="fa-regular fa-heart"></i>
            </button>):(<button
            style={{
                border: 'none', 
                backgroundColor: 'transparent', 
                padding: '0',
                cursor: 'pointer'}} 
              onClick={() => navigate('/login')}
                >
            <i className="fa-regular fa-heart"></i>
            </button>)}

  
            <div className="d-flex ml-auto">
                {isAuthenticated?(<Button 
                    style={{ borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}>
                    View Profile
                </Button>): (<Button 
                    style={{ borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}
                    onClick={() => navigate('/login')}>
                    View Profile
                </Button>)}
                {isAuthenticated?(<Button
                    className="ms-2"
                    style={{ backgroundColor: '#fdd77f', borderColor: '#fdd77f', borderRadius: '15px' }}>
                    View Contact
                </Button>):<Button
                    className="ms-2"
                    style={{ backgroundColor: '#fdd77f', borderColor: '#fdd77f', borderRadius: '15px' }}
                    onClick={() => navigate('/login')}>
                    View Contact
                </Button>}
                
            </div>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
