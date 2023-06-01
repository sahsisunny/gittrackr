import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import UserProfileImg from './../assets/features/user-profile.png';
import OrgDashboardImg from './../assets/features/org-dashboard.png';
import OrgProfileImg from './../assets/features/org-profile.png';
import PRsIssuesImg from './../assets/features/user.png';
import Footer from '@/components/Footer';

const about = () => {
  const [featureImage, setFeatureImage] = React.useState(PRsIssuesImg);
  const [activeButton, setActiveButton] = React.useState('');
  const [key, setKey] = React.useState('');

  const changeFeatureImage = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <div>
      <Navbar />
      <div className="about-container">
        <div className="hero">
          <h1 className="hero-title">
            Track, Manage, and Collaborate with
            <span className="hero-title-highlight">&nbsp;GitTrackr</span>
          </h1>
          <p className="hero-subtitle">
            Supercharge your GitHub workflow. Sign in, track and manage PRs,
            issues, repos, and orgs with ease.
          </p>
          <div className="hero-button-container">
            <Link href="/login" className="hero-button">
              Sign Up
            </Link>
            <Link href="/demo" className="hero-button demo-btn">
              Demo
            </Link>
          </div>
        </div>
        <div className="features">
          <h2 className="section-title">Features</h2>

          <div className="features-button-container">
            <button
              onClick={changeFeatureImage}
              className={`features-button ${
                activeButton === 'PRs & Issues' ? 'active' : ''
              }`}
            >
              PRs & Issues
            </button>
            <button
              onClick={changeFeatureImage}
              className={`features-button ${
                activeButton === 'User Profile' ? 'active' : ''
              }`}
            >
              User Profile
            </button>
            <button
              onClick={changeFeatureImage}
              className={`features-button ${
                activeButton === 'Org Dashboard' ? 'active' : ''
              }`}
            >
              Org Dashboard
            </button>
            <button
              onClick={changeFeatureImage}
              className={`features-button ${
                activeButton === 'Org Profile' ? 'active' : ''
              }`}
            >
              Org Profile
            </button>
          </div>
          <div
            className={`feature-image-container ${
              activeButton !== '' ? 'fade-in' : ''
            }`}
          >
            {' '}
            <Image
              key={key}
              className="feature-image"
              src={featureImage}
              alt="PRs & Issues"
            />
          </div>
        </div>
        <div className="testimonial hide">
          <div className="testimonial-title">
            <h2 className="section-title">Testimonials</h2>
            <div className="testimonial-text">
              <p className="testimonial-text-quote">
                GitTrackr has been a game changer for our team. We are able to
                track and manage our PRs and issues with ease. We are able to
                collaborate more efficiently and effectively.
              </p>
              <p className="testimonial-text-author">- John Doe</p>
            </div>
          </div>
        </div>

        <div className="about">
          <h2 className="section-title">
            About <span>GitTrackr</span>
          </h2>
          <div className="about-text">
            <p className="about-text-heading">
              Unleash the Power of GitHub with GitTrackr
            </p>
            <p className="about-text-paragraph">
              GitTrackr is a cutting-edge web application designed to
              revolutionize your GitHub workflow. Seamlessly integrating with
              your GitHub account, GitTrackr empowers developers and
              organizations to streamline their collaboration, effortlessly
              track their contributions, and stay ahead of the game.
            </p>
            <p className="about-text-heading">
              Stay in Sync, Boost Your Productivity
            </p>
            <p className="about-text-paragraph">
              With GitTrackr, you gain instant access to your GitHub profile,
              pull requests, issues, repositories, and organizational
              assignments. Effortlessly manage and track your contributions,
              ensuring you never miss a beat. Whether you are a solo developer
              or part of a dynamic team, GitTrackr provides you with the tools
              to collaborate efficiently and take control of your GitHub
              experience.
            </p>
            <p className="about-text-heading">
              Intuitive, User-Friendly Interface
            </p>
            <p className="about-text-paragraph">
              GitTrackr boasts a sleek and intuitive interface, designed with
              your productivity in mind. Navigate through your GitHub activities
              seamlessly, assign pull requests and issues with ease, and gain
              valuable insights into organizational profiles and repositories.
              Spend less time managing your GitHub workflow and more time
              building exceptional software.
            </p>
            <p className="about-text-heading">
              Join the GitTrackr Community Today!
            </p>
            <p className="about-text-paragraph">
              Ready to unlock the full potential of your GitHub account? Join
              the thriving GitTrackr community and experience a new level of
              efficiency and organization. Maximize productivity, organize your
              projects, and stay ahead of the competition. Sign up for GitTrackr
              today and revolutionize your GitHub workflow.
            </p>
          </div>
        </div>
        <div className="faq hide"></div>
        <div className="contact hide"></div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
