import React from 'react';
import Image from 'next/image';
import styles from './slider.module.css';

import DashboardImage from '@/assets/slider/dashboard.jpg';
import HomeImage from '@/assets/slider/home.jpg';
import OrgProfileImage from '@/assets/slider/org-profile.jpg';
import UserImage from '@/assets/slider/user.jpg';
import UserProfileImage from '@/assets/slider/user-profile.jpg';
import UserRepoImage from '@/assets/slider/user-repo.jpg';

import OrgDashboardImg from '@/assets/features/org-dashboard.png';
import UserProfileImg from '@/assets/features/user-profile.png';

const images = [
  HomeImage,
  UserImage,
  UserRepoImage,
  DashboardImage,
  OrgProfileImage,
  UserProfileImage,
];

const ImageText = [
  'Home',
  'User',
  'User Repo',
  'Dashboard',
  'Org Profile',
  'User Profile',
];

type SliderProps = {
  showFrame: boolean;
};

const Slider = ({ showFrame = false }: SliderProps) => {
  return (
    <div className={styles.slider}>
      <h2 className={styles.sectionHeading}>Features</h2>
      {showFrame ? (
        <div className={styles.ImageContainer}>
          <Image src={UserProfileImg} alt="Home" className={styles.imageOne} />
          <div className={styles.middleContainer}>
            <Image
              src={OrgProfileImage}
              alt="User"
              className={styles.imageTwo}
            />
            <Image
              src={UserRepoImage}
              alt="User Repo"
              className={styles.imageThree}
            />
          </div>
          <Image
            src={OrgDashboardImg}
            alt="Dashboard"
            className={styles.imageFour}
          />
        </div>
      ) : (
        <div className={styles.slide}>
          {images.map((image, index) => (
            <div className={styles.sliderItems} key={index}>
              <Image
                src={image}
                alt={`Slide ${index}`}
                className={styles.image}
              />
              <p className={styles.slideText}>{ImageText[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
