import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import profilePic from '../images/logo-2.png';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';
import { getContactMe } from '../queries/getContactMe';

const ContactMe: React.FC = () => {
  const [userData, setUserData] = useState<IContactMe>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getContactMe();
        setUserData(data);
      } catch (err) {
        console.error('Failed to load contact data:', err);
        setError('Unable to load contact data. Please check your DatoCMS configuration.');
        // Fallback contact data (Hire Me / Contact)
        setUserData({
          profilePicture: { url: profilePic },
          name: 'Nikhil Sharma',
          title: 'Financial Assistant | Credit & Financial Analysis',
          summary:
            'Financial Assistant optimizing processes and analyzing financials; CFA L1 candidate; blending BBA + PG Business Administration for credit, compliance, and reporting.',
          companyUniversity: 'Dial Enserch | Camosun College (Business Admin PG Cert)',
          linkedinLink: 'https://www.linkedin.com/in/nikhil-sharma-3219512b0/',
          email: 'Usernamenikhilsharma@gmail.com',
          phoneNumber: '+1 672-337-1208'
        });
      }
    }

    fetchUserData();
  }, []);

  if (error && !userData) return <div>Loading...</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="contact-container">
      <div className="linkedin-badge-custom">
        <img src={profilePic} alt="Nikhil Sharma" className="badge-avatar" />
        <div className="badge-content">
          <h3 className="badge-name">{userData?.name}</h3>
          <p className="badge-title">{userData.title}</p>
          <p className="badge-description">
            {userData.summary}
          </p>
          <p className="badge-company">{userData.companyUniversity}</p>
          <a
            href={userData.linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
          >
            <FaLinkedin className="linkedin-icon" /> View Profile
          </a>
        </div>
      </div>
      <div className="contact-header">
        <p>Let’s collaborate on credit analysis, process optimization, and financial reporting. Reach out for consulting or full-time opportunities.</p>
      </div>
      <div className="contact-details">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href={`mailto:${userData.email}`} className="contact-link">
            {userData.email}
          </a>
        </div>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <a href={`tel:${userData.phoneNumber}`} className="contact-link">
            {userData.phoneNumber}
          </a>
        </div>
        <div className="contact-fun">
          <p>Or catch up over a coffee ☕</p>
          <FaCoffee className="coffee-icon" />
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
