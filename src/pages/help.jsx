import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { GITTRACKR_URL } from '@/constants/url';

const about = () => {
  const [showAccordions, setShowAccordions] = useState({});

  const toggleAccordion = (index) => {
    setShowAccordions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <Head>
        <title>GitTrackr | Help & FAQ</title>
      </Head>
      <Navbar />
      <div className="help-container">
        <div className="help-section" id="faq">
          <h2 className="section-heading">Help & FAQ</h2>
          <div className="faq-container">
            <div className="faq">
              <div className="faq__title" onClick={() => toggleAccordion(1)}>
                <h3 className="question">Organization Not Visible?</h3>
                <button
                  type="button"
                  className={`faq-btn ${
                    showAccordions[1] ? 'faq-btn-show' : ''
                  }`}
                  onClick={() => toggleAccordion(1)}
                ></button>
              </div>

              <div className={`${showAccordions[1] ? 'show' : 'hide'}`}>
                <div className="answer-div">
                  <ol>
                    <li>
                      Open a web browser and navigate to the GitHub website at{' '}
                      <a href="https://github.com">https://github.com</a>.
                    </li>
                    <li>
                      Log in to your GitHub account using your credentials.
                    </li>
                    <li>
                      In the top-right corner of the GitHub page, click on your
                      profile picture or avatar to open the account menu.
                    </li>
                    <li>
                      From the account menu, select &quot;Your
                      organizations.&quot; This will display a list of
                      organizations you are a member of.
                    </li>
                    <li>
                      Locate the organization for which you want to make your
                      member profile public and click on its name to access the
                      organization&apos;s page.
                    </li>
                    <li>
                      On the organization&apos;s page, navigate to the
                      &quot;Members&quot; tab or section. This section usually
                      lists all the members of the organization.
                    </li>
                    <li>
                      Find your username or account in the list of members and
                      click on it to access your member profile within the
                      organization.
                    </li>
                    <li>
                      Once you are on your member profile page, you need to make
                      some changes to your organization visibility settings.
                    </li>
                    <li>
                      Near the top-right corner of the member profile page,
                      click on the &quot;Settings&quot; button. This will open
                      the settings page for your member profile.
                    </li>
                    <li>
                      On the settings page, scroll down to the &quot;Profile
                      visibility&quot; section.
                    </li>
                    <li>
                      By default, the profile visibility is set to
                      &quot;Private.&quot; Click on the drop-down menu and
                      select &quot;Public&quot; to make your member profile
                      visible to the public.
                    </li>
                    <li>
                      After selecting &quot;Public,&quot; the settings page may
                      automatically save the changes. If not, look for a
                      &quot;Save&quot; or &quot;Update&quot; button on the page
                      and click it to save the changes.
                    </li>
                    <li>
                      Once you have saved the changes, your member profile
                      within the GitHub organization should now be public and
                      visible to anyone who visits the organization&apos;s page.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="faq">
              <div className="faq__title" onClick={() => toggleAccordion(2)}>
                <h3 className="question">What is GitTrackr?</h3>
                <button
                  type="button"
                  className={`faq-btn ${
                    showAccordions[2] ? 'faq-btn-show' : ''
                  }`}
                  onClick={() => toggleAccordion(2)}
                ></button>
              </div>

              <div className={`${showAccordions[2] ? 'show' : 'hide'}`}>
                <p className="answer">
                  GitTrackr is a web application that allows you to track the
                  issue and pull request activity of your GitHub organization.
                  GitTrackr provides a dashboard that displays the number of
                  issues and pull requests that have been opened and closed over
                  a specified time period. GitTrackr also provides a list of
                  repositories that have had the most activity over the same
                  time period. GitTrackr allows you to view the activity of your
                  organization as a whole, or you can view the activity of
                  individual repositories within your organization.
                </p>
              </div>
            </div>

            <div className="faq">
              <div className="faq__title" onClick={() => toggleAccordion(3)}>
                <h3 className="question"> How do I use GitTrackr?</h3>
                <button
                  type="button"
                  className={`faq-btn ${
                    showAccordions[3] ? 'faq-btn-show' : ''
                  }`}
                  onClick={() => toggleAccordion(3)}
                ></button>
              </div>

              <div className={`${showAccordions[3] ? 'show' : 'hide'}`}>
                {' '}
                <p className="answer">
                  Go to the GitTrackr website at{' '}
                  <a href={GITTRACKR_URL}>GitTrackr</a> and log in with your
                  GitHub account. Once you have logged in, you will be able to
                  select an organization from the drop-down menu. After
                  selecting an organization, you will be able to select a time
                  period from the drop-down menu. Once you have selected an
                  organization and a time period, you will be able to view the
                  activity of your organization. You can also view the activity
                  of individual repositories within your organization by
                  selecting a repository from the drop-down menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
