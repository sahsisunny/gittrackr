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

const about = () => {
  const [featureImage, setFeatureImage] = React.useState(PRsIssuesImg);
  const [activeButton, setActiveButton] = React.useState('');
  const [key, setKey] = React.useState('');
  const [showAccordions, setShowAccordions] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const toggleAccordion = (index) => {
    setShowAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

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

        <div className="testimonial">
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
          </div>
        </div>

        <div className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq">
              <a className="faq-link" href="#faq1">
                <div
                  className="faq__title"
                  onClick={() => toggleAccordion(1)}

                >
                  <h3 className="question">How do I sign up for GitTrackr?</h3>
                  <button
                type="button"
                className={`faq-btn ${showAccordions[1] ? 'faq-btn-show' : ''}`}
                onClick={() => toggleAccordion(1)}
              ></button>
                </div>
              </a>
              <div className={`${showAccordions[1] ? 'show' : 'hide'}`}>                <p className="answer">
                  Signing up for GitTrackr is quick and easy. Simply click on
                  the &apos;Sign Up&apos; button on the homepage and follow the
                  registration process. You will need a GitHub account to sign
                  up.
                </p>
              </div>
            </div>

            <div className="faq">
              <a className="faq-link" href="#faq1">
                <div
                  className="faq__title"
                  onClick={() => toggleAccordion(2)}

                >
                  <h3 className="question">
                    Can I track multiple GitHub accounts with GitTrackr?
                  </h3>
                  <button
                type="button"
                className={`faq-btn ${showAccordions[2] ? 'faq-btn-show' : ''}`}
                onClick={() => toggleAccordion(2)}
              ></button>
                </div>
              </a>
              <div className={`${showAccordions[2] ? 'show' : 'hide'}`}>                <p className="answer">
                  Yes, GitTrackr allows you to connect and track multiple GitHub
                  accounts. Simply sign in with each GitHub account you want to
                  link to GitTrackr, and you will be able to switch between them
                  seamlessly.
                </p>
              </div>
            </div>
          
            <div className="faq">
              <a className="faq-link" href="#faq1">
                <div
                  className="faq__title"
                  onClick={() => toggleAccordion(3)}

                >
                  <h3 className="question">How do I sign up for GitTrackr?</h3>
                  <button
                type="button"
                className={`faq-btn ${showAccordions[3] ? 'faq-btn-show' : ''}`}
                onClick={() => toggleAccordion(3)}
              ></button>
                </div>
              </a>
              <div className={`${showAccordions[3] ? 'show' : 'hide'}`}>                <p className="answer">
                  Signing up for GitTrackr is quick and easy. Simply click on
                  the &apos;Sign Up&apos; button on the homepage and follow the
                  registration process. You will need a GitHub account to sign
                  up.
                </p>
              </div>
            </div>

            <div className="faq">
              <a className="faq-link" href="#faq1">
                <div
                  className="faq__title"
                  onClick={() => toggleAccordion(4)}

                >
                  <h3 className="question">
                    Can I track multiple GitHub accounts with GitTrackr?
                  </h3>
                  <button
                type="button"
                className={`faq-btn ${showAccordions[4] ? 'faq-btn-show' : ''}`}
                onClick={() => toggleAccordion(4)}
              ></button>
                </div>
              </a>
              <div className={`${showAccordions[4] ? 'show' : 'hide'}`}>                <p className="answer">
                  Yes, GitTrackr allows you to connect and track multiple GitHub
                  accounts. Simply sign in with each GitHub account you want to
                  link to GitTrackr, and you will be able to switch between them
                  seamlessly.
                </p>
              </div>
            </div>
            <div className="faq">
              <a className="faq-link" href="#faq1">
                <div
                  className="faq__title"
                  onClick={() => toggleAccordion(1)}

                >
                  <h3 className="question">How do I sign up for GitTrackr?</h3>
                  <button
                type="button"
                className={`faq-btn ${showAccordions[1] ? 'faq-btn-show' : ''}`}
                onClick={() => toggleAccordion(1)}
              ></button>
                </div>
              </a>
              <div className={`${showAccordions[1] ? 'show' : 'hide'}`}>                <p className="answer">
                  Signing up for GitTrackr is quick and easy. Simply click on
                  the &apos;Sign Up&apos; button on the homepage and follow the
                  registration process. You will need a GitHub account to sign
                  up.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="contact">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-container">
        <div className="contact-image-container">
          <Image
            src={ContactUsImg}
            alt="contact"
            className='contact-image'
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
          <button type="submit"
          className="submit-button"
          >Submit</button>
        </form>
      </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
