import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiGithub,
  FiCompass,
  FiCheckCircle,
  FiShield,
  FiActivity,
  FiArrowRight,
  FiAlertTriangle,
} from 'react-icons/fi';

import Logo from '../assets/GitTrackr.png';
import Layout from '@/components/Layout';
import { Spinner } from '@/components/Loader';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (router.query.error) {
      setAuthError(
        router.query.error === 'OAuthSignin' || router.query.error === 'OAuthCallback'
          ? 'GitHub OAuth configuration is missing or invalid. Check your .env credentials or try the Live Demo below.'
          : String(router.query.error)
      );
    }
  }, [router.query]);

  return (
    <Layout
      title="GitTrackr | Sign In to Your Developer Cockpit"
      description="Connect your GitHub account or explore the interactive live demo mode to access real-time pull request velocity and multi-repo issue triage."
    >
      <div className="container">
        <div className="sign-container">
          {/* Left Column: Value Prop */}
          <div className="left-side">
            <div className="auth-brand">
              <Image
                src={Logo}
                alt="GitTrackr Logo"
                width={48}
                height={48}
                priority
              />
              <h2>GitTrackr</h2>
            </div>

            <ul className="auth-features-list">
              <li className="auth-feature-item">
                <FiCheckCircle className="auth-feature-icon" aria-hidden="true" />
                <span>
                  <strong>Unified PR & Issue Streams:</strong> Triage all assigned and authored items with live filters.
                </span>
              </li>
              <li className="auth-feature-item">
                <FiActivity className="auth-feature-icon" aria-hidden="true" />
                <span>
                  <strong>Multi-Org Switching:</strong> Switch between company workspaces and open-source orgs in 1-click.
                </span>
              </li>
              <li className="auth-feature-item">
                <FiShield className="auth-feature-icon" aria-hidden="true" />
                <span>
                  <strong>Privacy First:</strong> Scoped read-only access. No source code or secrets are ever stored.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Actions */}
          <div className="right-side">
            <h1 className="auth-card-title">Welcome to GitTrackr</h1>
            <p className="auth-card-subtitle">Sign in to sync your GitHub repositories, pull requests, and issues.</p>

            {authError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(244, 63, 94, 0.12)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#f43f5e',
                  fontSize: '0.85rem',
                  maxWidth: '340px',
                  textAlign: 'left',
                }}
              >
                <FiAlertTriangle style={{ flexShrink: 0 }} size={18} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="button"
              className="sign-btn"
              disabled={isSigningIn}
              onClick={() => {
                setIsSigningIn(true);
                signIn('github', { callbackUrl: '/' });
              }}
            >
              {isSigningIn ? (
                <>
                  <Spinner size="sm" color="#040914" />
                  <span>Connecting to GitHub...</span>
                </>
              ) : (
                <>
                  <FiGithub size={20} aria-hidden="true" />
                  <span>Continue with GitHub</span>
                </>
              )}
            </button>

            {/* Live Demo Option */}
            <Link href="/dashboard/octocat" className="demo-access-btn">
              <FiCompass size={18} aria-hidden="true" />
              <span>Explore Sample Demo Dashboard</span>
              <FiArrowRight size={14} aria-hidden="true" />
            </Link>

            <p className="auth-disclaimer">
              By connecting your account, you authorize GitTrackr to read public profile, organization memberships, and repository issues/PRs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
