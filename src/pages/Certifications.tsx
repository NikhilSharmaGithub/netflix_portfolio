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
            title: 'Bloomberg Market Concepts',
            issuer: 'Bloomberg',
            issuedDate: '2025',
            link: 'https://portal.bloombergforeducation.com/certificates/TdXHYSECM6JSVuaXTustWuxs',
            iconName: 'university'
          },
          {
            title: 'Environmental Social Governance',
            issuer: 'Bloomberg',
            issuedDate: '2025',
            link: 'https://portal.bloombergforeducation.com/certificates/n48HvNkZN3uAY6MCG4dpXPue',
            iconName: 'university'
          },
          {
            title: 'Google Data Analytics (Specialization)',
            issuer: 'Coursera',
            issuedDate: '2025',
            link: 'https://www.coursera.org/account/accomplishments/specialization/4N1ZEMJV70MJ',
            iconName: 'coursera'
          },
          {
            title: 'Accounting & Financial Statement Analysis',
            issuer: 'Wall Street Prep',
            issuedDate: '2025',
            link: 'https://certification.wallstreetprep.com/1d0508db-cb05-426e-831c-3c3de7fdf7df#acc.d32BxRwk',
            iconName: 'university'
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
