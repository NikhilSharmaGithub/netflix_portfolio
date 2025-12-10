import React, { useEffect, useState } from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';
import { getProfileBanner } from '../queries/getProfileBanner';
import { ProfileBanner as ProfileBannerType } from '../types';

const ProfileBanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<ProfileBannerType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProfileBanner();
        setBannerData(data);
      } catch (err) {
        console.error('Failed to load profile banner:', err);
        setError('Unable to load profile data. Please check your DatoCMS configuration.');
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="profile-banner">
        <div className="banner-content">
          <h1 className="banner-headline">Welcome to My Portfolio</h1>
          <p className="banner-description">
            Full-stack developer passionate about creating innovative solutions.
          </p>
          <div className="banner-buttons">
            <PlayButton onClick={() => window.open('#', '_blank')} label="Resume" />
            <MoreInfoButton onClick={() => window.open('#', '_blank')} label="Linkedin" />
          </div>
        </div>
      </div>
    );
  }

  if (!bannerData) return <div>Loading...</div>;

  const handlePlayClick = () => {
    window.open(bannerData.resumeLink.url, '_blank');
  };

  const handleLinkedinClick = () => { 
    window.open(bannerData.linkedinLink, '_blank');
  }

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline" id='headline'>{bannerData.headline}</h1>
        <p className="banner-description">
          {bannerData.profileSummary}
        </p>

        <div className="banner-buttons">
          <PlayButton onClick={handlePlayClick} label="Resume" />
          <MoreInfoButton onClick={handleLinkedinClick} label="Linkedin" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
