import { FC, useState } from 'react';
import Image from 'next/image';

import OrgDashboardImg from '@/assets/features/org-dashboard.png';
import OrgProfileImg from '@/assets/features/org-profile.png';
import PRsIssuesImg from '@/assets/features/user.png';
import UserProfileImg from '@/assets/features/user-profile.png';

import styles from './features.module.css';

const Features: FC = () => {
  const [key, setKey] = useState('');
  const [featureImage, setFeatureImage] = useState(PRsIssuesImg);
  const [activeButton, setActiveButton] = useState('');

  const changeFeatureImage = (e: React.MouseEvent<HTMLElement>) => {
    setFeatureImage(
      e.currentTarget.textContent === 'PRs & Issues'
        ? PRsIssuesImg
        : e.currentTarget.textContent === 'User Profile'
        ? UserProfileImg
        : e.currentTarget.textContent === 'Org Dashboard'
        ? OrgDashboardImg
        : OrgProfileImg
    );
    setActiveButton('active');
    setKey(Date.now().toString());
  };

  return (
    <div className={styles.features} id="features">
      <h2 className={styles.sectionHeading}>Features</h2>
      <div className={styles.featuresButtonContainer}>
        <button
          onClick={changeFeatureImage}
          className={`${styles.featuresButton} ${
            activeButton === 'PRs & Issues' ? 'active' : ''
          }`}
        >
          PRs & Issues
        </button>
        <button
          onClick={changeFeatureImage}
          className={`${styles.featuresButton} ${
            activeButton === 'User Profile' ? 'active' : ''
          }`}
        >
          User Profile
        </button>
        <button
          onClick={changeFeatureImage}
          className={`${styles.featuresButton} ${
            activeButton === 'Org Dashboard' ? 'active' : ''
          }`}
        >
          Org Dashboard
        </button>
        <button
          onClick={changeFeatureImage}
          className={`${styles.featuresButton} ${
            activeButton === 'Org Profile' ? 'active' : ''
          }`}
        >
          Org Profile
        </button>
      </div>
      <div
        className={`${styles.featureImageContainer} ${
          activeButton !== '' ? 'fade-in' : ''
        }`}
      >
        <Image
          key={key}
          className={styles.featureImage}
          src={featureImage}
          alt="PRs & Issues"
        />
      </div>
    </div>
  );
};

export default Features;
