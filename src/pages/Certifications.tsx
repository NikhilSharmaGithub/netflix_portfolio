import React, { useEffect, useState } from 'react';
import './Certifications.css';
import { FaExternalLinkAlt, FaUniversity } from 'react-icons/fa';
import { SiUdemy, SiCoursera, SiIeee } from 'react-icons/si';
import { Certification } from '../types';
import { getCertifications } from '../queries/getCertifications';
const iconData: { [key: string]: JSX.Element } = {
  'udemy': <SiUdemy />,
  'coursera': <SiCoursera />,
  'ieee': <SiIeee />,
  'university': <FaUniversity />
}

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const data = await getCertifications();
        setCertifications(data);
      } catch (err) {
        console.error('Failed to load certifications:', err);
        setError('Unable to load certifications data. Please check your DatoCMS configuration.');
        // Fallback certifications data
        setCertifications([
          {
            title: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            issuedDate: '2024',
            link: '#',
            iconName: 'university'
          },
          {
            title: 'React Developer Certification',
            issuer: 'Meta',
            issuedDate: '2023',
            link: '#',
            iconName: 'coursera'
          },
          {
            title: 'Full Stack Web Development',
            issuer: 'Udemy',
            issuedDate: '2023',
            link: '#',
            iconName: 'udemy'
          }
        ]);
      }
    }

    fetchCertifications();
  }, []);

  if (error && certifications.length === 0) return <div>Loading...</div>;
  if (certifications.length === 0) return <div>Loading...</div>;

  return (
    <div className="certifications-container">
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <a href={cert.link} key={index} target="_blank" rel="noopener noreferrer" className="certification-card" style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}>
            <div className="certification-content">
              <div className="certification-icon">{iconData[cert.iconName] || <FaUniversity />}</div>
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
              {cert.issuedDate && <span className="issued-date">Issued {cert.issuedDate}</span>}
            </div>
            <div className="certification-link animated-icon">
              <FaExternalLinkAlt />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
