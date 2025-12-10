import React, { useEffect, useState } from 'react';
import './ContactMe.css';
import profilePic from '../images/sumanth.jpeg';
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
        // Fallback contact data
        setUserData({
          profilePicture: { url: profilePic },
          name: 'Sumanth Samala',
          title: 'Full Stack Developer',
          summary: 'Passionate full-stack developer with expertise in modern web technologies and cloud solutions.',
          companyUniversity: 'Freelance Developer',
          linkedinLink: '#',
          email: 'contact@example.com',
          phoneNumber: '+1 (555) 123-4567'
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
        <img src={profilePic} alt="Sumanth Samala" className="badge-avatar" />
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
        <p>I'm always up for a chat or a coffee! Feel free to reach out.</p>
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
