import moment from 'moment';
import Image from 'next/image';

type ProfileGitHubStatsProps = {
  JOIN_DATE: string;
  USER_FOLLOWERS: number;
  USER_FOLLOWING: number;
  USER_PUBLIC_REPOS: number;
  orgsData: {
    id: number;
    html_url: string;
    avatar_url: string;
    login: string;
  }[];
};

const ProfileGitHubStats = ({
  JOIN_DATE,
  USER_FOLLOWERS,
  USER_FOLLOWING,
  USER_PUBLIC_REPOS,
  orgsData,
}: ProfileGitHubStatsProps) => {
  return (
    <div className="section-tab-content">
      <h5 className="section-sidebar-title">GitHub Stats</h5>
      <div className="profile-stats">
        <div className="profile-stats-items">
          <p>Joined GitHub</p>
          <hr />
          <p>{moment(JOIN_DATE).fromNow()}</p>
        </div>
        <div className="profile-stats-items">
          <p>Followers</p>
          <hr />
          <p>{USER_FOLLOWERS}</p>
        </div>
        <div className="profile-stats-items">
          <p>Following</p>
          <hr />
          <p>{USER_FOLLOWING}</p>
        </div>
        <div className="profile-stats-items">
          <p>Public Repos</p>
          <hr />
          <p>{USER_PUBLIC_REPOS}</p>
        </div>
      </div>

      {orgsData?.length > 0 && (
        <div className="orgs-container">
          <h5 className="section-sidebar-title">Organizations</h5>
          <div className="orgs-list-container">
            {orgsData?.map((org) => (
              <a
                href={org.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={org.id}
                className="orgs-list-item"
              >
                <Image
                  src={org.avatar_url}
                  alt={org.login}
                  className="org-avatar"
                  width={50}
                  height={50}
                />
                <p className="org-name">{org.login}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileGitHubStats;
