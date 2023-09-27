import React from 'react';
import { AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai';
import { FaGithubSquare } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';

type ProfileSidebarProps = {
  USERNAME: string;
  WEBSITE?: string;
  NAME?: string;
  BIO?: string;
  mostUsedLanguages: string[];
  languageColors: { [key: string]: string };
};

function isColorLight(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

const ProfileSidebar = ({
  USERNAME,
  WEBSITE,
  NAME,
  BIO,
  mostUsedLanguages,
  languageColors,
}: ProfileSidebarProps) => (
  <div className="section-sidebar">
    <div className="sidebar-container">
      <h5 className="section-sidebar-title">Social Links</h5>
      <div className="social-links-container">
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <FaGithubSquare />
        </a>
        <a
          href={`https://twitter.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <AiFillTwitterSquare />
        </a>
        <a
          href={`https://www.linkedin.com/in/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <AiFillLinkedin />
        </a>
        {WEBSITE && (
          <a
            href={WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <TbWorldWww />
          </a>
        )}
      </div>
    </div>
    <div className="sidebar-container">
      <h5 className="section-sidebar-title">
        {NAME ? `${NAME}'s Bio` : 'Bio'}
      </h5>
      {BIO && <p className="user-bio">{BIO}</p>}
    </div>
    <div className="sidebar-container">
      <h5 className="section-sidebar-title">Most Used Languages</h5>
      <div className="languages-container">
        {mostUsedLanguages.map((language, index) => {
          const bgColor = languageColors[language];
          const textColor = isColorLight(bgColor) ? '#000' : '#fff';

          return (
            <span
              className="language"
              key={index}
              data-language={language}
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              {language}
            </span>
          );
        })}
      </div>
    </div>
  </div>
);

export default ProfileSidebar;
