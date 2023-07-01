import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import UserProfileImg from './../assets/features/user-profile.png';
import OrgDashboardImg from './../assets/features/org-dashboard.png';
import OrgProfileImg from './../assets/features/org-profile.png';
import PRsIssuesImg from './../assets/features/user.png';
import ContactUsImg from './../assets//contactus.png';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Faq from '@/components/FAQ';

const about = () => {
  const { data: session } = useSession();

  const [featureImage, setFeatureImage] = React.useState(PRsIssuesImg);
  const [activeButton, setActiveButton] = React.useState('');
  const [key, setKey] = React.useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the data to a server)
    // You can access the form data using the state variables (name, email, message)

    console.log('Form submitted:', { name, email, message });
    // Reset the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  const changeFeatureImage = (e) => {
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
      <Head>
        <title>GitTrackr</title>
      </Head>
      <Navbar />
      <div className="about-container">
        <div className="hero" id="home">
          <h1 className="hero-title">
            {!session ? (
              <>
                Track, Manage, and Collaborate with
                <span className="hero-title-highlight">&nbsp;GitTrackr</span>
              </>
            ) : (
              <>
                Welcome to GitTrackr
                {session.user.name && (
                  <span className="hero-title-highlight">
                    &nbsp;{session.user.name.split(' ')[0]}
                  </span>
                )}
              </>
            )}
          </h1>
          <p className="hero-subtitle">
            Supercharge your GitHub workflow. Sign in, track and manage PRs,
            issues, repos, and orgs with ease.
          </p>
          <div className="hero-button-container">
            {!session ? (
              <>
                <Link href="/login" className="hero-button">
                  Sign in
                </Link>
                <Link href="#" className="hero-button demo-btn">
                  Demo
                </Link>
              </>
            ) : (
              <Link href="/profile" className="hero-button demo-btn">
                See Profile
              </Link>
            )}
          </div>
        </div>

        <div className="features" id="features">
          <h2 className="section-heading">Features</h2>
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

        <div className="testimonial" id="testimonials">
          <div className="testimonial-title">
            <h2 className="section-heading">Testimonials</h2>
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

        <div className="about" id="about">
          <h2 className="section-heading">
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
          </div>
        </div>
        <Faq />

        <div className="contact" id="contact">
          <h2 className="section-heading">Contact Us</h2>
          <div className="contact-container">
            <div className="contact-image-container">
              <Image
                src={ContactUsImg}
                alt="contact"
                className="contact-image"
              />
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
