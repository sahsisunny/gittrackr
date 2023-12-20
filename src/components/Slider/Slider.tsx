import React, { useState } from 'react';
import Image from 'next/image';
import styles from './slider.module.css';

import OrgProfileImage from '@/assets/slider/org-profile.jpg';
import UserRepoImage from '@/assets/slider/user-repo.jpg';

import OrgDashboardImg from '@/assets/features/org-dashboard.png';
import UserProfileImg from '@/assets/features/user-profile.png';

const Slider = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openFullscreen = (imageSrc: any) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className={styles.slider}>
      <h2 className={styles.sectionHeading}>Features</h2>
      <div className={styles.ImageContainer}>
        <Image
          src={UserProfileImg}
          alt="Home"
          className={styles.imageOne}
          onClick={() => openFullscreen(UserProfileImg)}
        />
        <div className={styles.middleContainer}>
          <Image
            src={OrgProfileImage}
            alt="User"
            className={styles.imageTwo}
            onClick={() => openFullscreen(OrgProfileImage)}
          />
          <Image
            src={UserRepoImage}
            alt="User Repo"
            className={styles.imageThree}
            onClick={() => openFullscreen(UserRepoImage)}
          />
        </div>
        <Image
          src={OrgDashboardImg}
          alt="Dashboard"
          className={styles.imageFour}
          onClick={() => openFullscreen(OrgDashboardImg)}
        />
      </div>

      {fullscreenImage && (
        <div className={styles.fullscreen}>
          <button onClick={closeFullscreen} className={styles.closeButton}>
            Close
          </button>
          <Image
            src={fullscreenImage}
            alt="Fullscreen Image"
            className={styles.fullscreenImage}
          />
        </div>
      )}
    </div>
  );
};

export default Slider;
