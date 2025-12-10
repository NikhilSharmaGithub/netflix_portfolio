import React, { useEffect, useState } from 'react';
import './Skills.css';
import { getSkills } from '../queries/getSkills';

import {
  FaChartLine,
  FaClipboardList,
  FaBalanceScale,
  FaTasks,
  FaChartPie,
  FaFileWord,
  FaFilePowerpoint,
  FaFileExcel,
} from 'react-icons/fa';
import { SiNetlify } from 'react-icons/si';
import { Skill } from '../types';

const iconMap: { [key: string]: JSX.Element } = {
  FaChartLine: <FaChartLine />,
  FaClipboardList: <FaClipboardList />,
  FaBalanceScale: <FaBalanceScale />,
  FaTasks: <FaTasks />,
  FaChartPie: <FaChartPie />,
  FaFileWord: <FaFileWord />,
  FaFilePowerpoint: <FaFilePowerpoint />,
  FaFileExcel: <FaFileExcel />,
  SiNetlify: <SiNetlify />,
};


const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getSkills();
        setSkillsData(data);
      } catch (err) {
        console.error('Failed to load skills:', err);
        setError('Unable to load skills data. Please check your DatoCMS configuration.');
        // Fallback skills data aligned to current experience, certifications, and education
        setSkillsData([
          {
            name: 'Financial Analysis & Credit Review',
            category: 'Finance',
            description: 'Analyze financials/credit history; assess risk appetite and creditworthiness.',
            icon: 'FaChartLine'
          },
          {
            name: 'Process Optimization & Compliance',
            category: 'Finance',
            description: 'Streamline credit application flows; maintain secure document controls and policy compliance.',
            icon: 'FaClipboardList'
          },
          {
            name: 'Equity & Fixed Income Research',
            category: 'Finance',
            description: 'Apply CFA L1 fundamentals across equities, fixed income, and alternatives.',
            icon: 'FaBalanceScale'
          },
          {
            name: 'Accounting & Financial Statements',
            category: 'Finance',
            description: 'Statement analysis (per Wall Street Prep and Bloomberg Market Concepts training).',
            icon: 'FaTasks'
          },
          {
            name: 'Excel (Financial Modeling)',
            category: 'Office Suite',
            description: 'Models, sensitivity tables, lookups, pivots for reporting and analytics.',
            icon: 'FaFileExcel'
          },
          {
            name: 'PowerPoint (Storytelling)',
            category: 'Office Suite',
            description: 'Executive-ready decks for client updates, findings, and recommendations.',
            icon: 'FaFilePowerpoint'
          },
          {
            name: 'Word (Documentation)',
            category: 'Office Suite',
            description: 'Policies, SOPs, credit memos, and client-facing documentation.',
            icon: 'FaFileWord'
          },
          {
            name: 'Project/Program Delivery',
            category: 'Projects & Delivery',
            description: 'Scope, budget, delivery across 35+ web/ecommerce projects; client/stakeholder management.',
            icon: 'SiNetlify'
          },
          {
            name: 'SEO & Web Performance',
            category: 'Projects & Delivery',
            description: 'Organic traffic growth up to 70%; landing page and ecommerce optimization.',
            icon: 'FaChartPie'
          },
          {
            name: 'React & TypeScript',
            category: 'Technology',
            description: 'Modern frontend for client sites/portals; component-driven delivery.',
            icon: 'FaChartLine'
          },
          {
            name: 'Node.js & APIs',
            category: 'Technology',
            description: 'Backend and integration work for web projects; REST/JSON workflows.',
            icon: 'FaClipboardList'
          },
          {
            name: 'Python & Data',
            category: 'Technology',
            description: 'Scripting/analysis for data handling and automation (analytics coursework).',
            icon: 'FaTasks'
          }
        ]);
      }
    }

    fetchSkills()
  }, []);

  if (error && skillsData.length === 0) return <div>Loading...</div>;
  if (skillsData.length === 0) return <div>Loading...</div>;

  const skillsByCategory = skillsData.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});


  return (
    <div className="skills-container">
      {Object.keys(skillsByCategory).map((category, index) => (
        category === 'Technology' ? null : (
        <div key={index} className="skill-category">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {skillsByCategory[category].map((skill: any, idx: number) => (
              <div key={idx} className="skill-card">
                <div className="icon">{iconMap[skill.icon] || <FaChartLine />}</div>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
      ))}
    </div>
  );
};

export default Skills;
