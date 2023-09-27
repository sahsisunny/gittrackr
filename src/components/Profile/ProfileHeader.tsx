import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import ProfileImage from '../../assets/dummyProfileImage.png';

type ProfileHeaderProps = {
  NAME: string;
  USERNAME: string;
  COMPANY: string;
  AVATAR_URL: string;
};

const ProfileHeader = ({
  NAME,
  USERNAME,
  COMPANY,
  AVATAR_URL,
}: ProfileHeaderProps) => (
  <div className="section-profile">
    <div className="profile-image">
      <Image
        src={AVATAR_URL || ProfileImage}
        alt={NAME || USERNAME}
        className="avatar-photo"
        width={200}
        height={200}
      />
    </div>
    <div className="profile-header">
      {NAME ? (
        <h5 className="user-name">{NAME || 'No name'}</h5>
      ) : (
        <h5 className="user-login">{USERNAME || 'No username'}</h5>
      )}
      {COMPANY && <h5 className="user-company">Worked at {COMPANY}</h5>}
      <p className="user-login">
        <AiFillGithub />
        {USERNAME}
      </p>
    </div>
  </div>
);

export default ProfileHeader;
