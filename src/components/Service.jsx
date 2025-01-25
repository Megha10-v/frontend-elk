import React from 'react';
import Carousel from './Carousel';

import cleaning from '../assets/ic_cleaning_service.png';
import repairing from '../assets/ic_repairing_service.png';
import painting from '../assets/ic_painting_service.png';
import plumbing from '../assets/ic_plumbing_service.png';
import electricain from '../assets/ic_electrician_service.png';
import carpentry from '../assets/ic_carpentry_service.png';
import laundry from '../assets/ic_laudery_service.png';
import salon from '../assets/ic_saloon_service.png'

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
return (
      <div>
        <Carousel categories={serviceCategories} />
      </div>
    );
}

export default Service
