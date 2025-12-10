import React, { useEffect, useState } from 'react';
import './WorkPermit.css';
import { getWorkPermit } from '../queries/getWorkPermit';
import { WorkPermit as IWorkPermit } from '../types';
const WorkPermit: React.FC = () => {
  const [workPermitData, setWorkPermitData] = useState<IWorkPermit | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkPermitData() {
      try {
        const data = await getWorkPermit();
        setWorkPermitData(data);
      } catch (err) {
        console.error('Failed to load work permit data:', err);
        setError('Unable to load work permit data. Please check your DatoCMS configuration.');
        // Fallback work permit data
        setWorkPermitData({
          visaStatus: 'Skilled Worker Visa',
          expiryDate: new Date('2025-12-31'),
          summary: 'Currently on a Skilled Worker Visa allowing work in the UK',
          additionalInfo: 'Valid work permit with full rights to work and reside in the United Kingdom.'
        });
      }
    }
    fetchWorkPermitData();
  }, []);

  if (error && !workPermitData) return <div>Loading...</div>;
  if (!workPermitData) return <div>Loading...</div>;

  return (
    <div className="work-permit-container">
      <div className="work-permit-card">
        <h2 className="work-permit-headline">🎓 Work Permit</h2>
        <p className="work-permit-summary">
          I'm currently on a <strong>{workPermitData.visaStatus}</strong> 🛂, which allows me to work in the UK! 🇬🇧 My visa is valid until <strong>{new Date(workPermitData.expiryDate).toLocaleDateString()}</strong> 📅, giving me the opportunity to build valuable experience and grow my career here. 🌟
        </p>
        <p className="additional-info">{workPermitData.additionalInfo}</p>
      </div>
    </div>
  );
};

export default WorkPermit;
