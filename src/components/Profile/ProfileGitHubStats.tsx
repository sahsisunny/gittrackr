import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProfileGitHubStats.module.css';

type User = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

type ProfileGitHubStatsProps = {
  JOIN_DATE: string;
  USER_FOLLOWERS: number;
  USER_FOLLOWING: number;
  USER_PUBLIC_REPOS: number;
  orgsData?: User[];
  usersData?: User[];
  isUser: boolean;
};

const ProfileGitHubStats = ({
  JOIN_DATE,
  USER_FOLLOWERS,
  USER_FOLLOWING,
  USER_PUBLIC_REPOS,
  orgsData,
  usersData,
}: ProfileGitHubStatsProps) => {
  const renderUsers = (users: User[], isUser = false) => {
    return users.map((user) => (
      <div className={styles.orgsContainer} key={user.id}>
        <Link
          href={isUser ? `/profile/${user.login}` : `/orgs/${user.login}`}
          className={styles.orgsListItem}
        >
          <Image
            src={user.avatar_url}
            alt={user.login || 'User'}
            width={50}
            height={50}
            className="org-avatar"
          />
          <span className="org-name">{user.login}</span>
        </Link>
      </div>
    ));
  };

  function showUserOrgsTitle() {
    if (usersData?.length) {
      return 'Members';
    } else if (orgsData?.length) {
      return 'Organization';
    } else {
      return null;
    }
  }

  return (
    <div className="section-tab-content">
      <h5 className="section-sidebar-title">GitHub Stats</h5>
      <div className={styles.profileStats}>
        <div className={styles.profileStatsItems}>
          <p>Joined GitHub</p>
          <hr />
          <p>{moment(JOIN_DATE).fromNow()}</p>
        </div>
        <div className={styles.profileStatsItems}>
          <p>Followers</p>
          <hr />
          <p>{USER_FOLLOWERS}</p>
        </div>
        <div className={styles.profileStatsItems}>
          <p>Following</p>
          <hr />
          <p>{USER_FOLLOWING}</p>
        </div>
        <div className={styles.profileStatsItems}>
          <p>Public Repos</p>
          <hr />
          <p>{USER_PUBLIC_REPOS}</p>
        </div>
      </div>
      <h5 className="section-sidebar-title">{showUserOrgsTitle()}</h5>
      <div className={styles.usersContainer}>
        {orgsData && orgsData.length > 0 && renderUsers(orgsData)}
        {usersData && usersData.length > 0 && renderUsers(usersData, true)}
      </div>
    </div>
  );
};

export default ProfileGitHubStats;
