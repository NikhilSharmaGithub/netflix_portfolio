import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon } from 'react-icons/fa';
import './WorkExperience.css';
import { TimelineItem } from '../types';
import { getTimeline } from '../queries/getTimeline';


const WorkExperience: React.FC = () => {
  const [timeLineData, setTimeLineData] = useState<TimelineItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimelineItem() {
      try {
        const data = await getTimeline();
        setTimeLineData(data);
      } catch (err) {
        console.error('Failed to load timeline data:', err);
        setError('Unable to load timeline data. Please check your DatoCMS configuration.');
        // Fallback timeline data
        setTimeLineData([
          {
            timelineType: 'work',
            name: 'Dial Enserch — Dallas, TX (Remote)',
            title: 'Financial Assistant (Full-time)',
            techStack: 'Process optimization, Credit analysis, Compliance',
            summaryPoints: [
              'Boosted credit-application turnaround by 15% via process improvements.',
              'Maintained secure document controls aligned with policies and regulations.',
              'Analyzed financials and credit reports for 250+ clients to assess risk.'
            ],
            dateRange: 'Jun 2024 – Present'
          },
          {
            timelineType: 'work',
            name: 'R Marketing Minds — Dallas, TX',
            title: 'Business Project Manager & Web Development Consultant (Freelance)',
            techStack: 'Project leadership, Web development, SEO, Client management',
            summaryPoints: [
              'Managed a team of 4; delivered 35+ web/ecommerce/branding projects (2024).',
              'Owned lifecycle from requirements, scope, budget to delivery.',
              'SEO impact: lifted organic traffic up to 70% in 6 months; 65% repeat business.'
            ],
            dateRange: 'Dec 2022 – Present'
          },
          {
            timelineType: 'work',
            name: 'Sonam Enterprise — Jalandhar, India',
            title: 'Sales Intern',
            techStack: 'Sales ops, Market research, Events',
            summaryPoints: [
              'Organized promos and campaigns improving local brand visibility.',
              'Prepared tailored proposals/quotes; handled inquiries and follow-ups.',
              'Market research and pitching contributed to ~75% sales lift during internship.'
            ],
            dateRange: 'Apr 2022 – Aug 2022'
          },
          {
            timelineType: 'education',
            name: 'Camosun College — Post Graduate Certificate, Business Administration',
            title: 'Victoria, Canada',
            techStack: 'Business administration, Finance, Quantitative methods',
            summaryPoints: [
              'Post Graduate Certificate in Business Administration (Jan 2025 – Aug 2026).'
            ],
            dateRange: 'Jan 2025 – Aug 2026'
          },
          {
            timelineType: 'education',
            name: 'CFA Institute — CFA Level I Registered Candidate',
            title: 'Exam on 14 Nov 2025',
            techStack: 'Alternatives, Fixed Income, Equity, Ethics',
            summaryPoints: [
              'Registered candidate; studying for Level I exam (Nov 14, 2025).'
            ],
            dateRange: 'Jun 2025 – Present'
          },
          {
            timelineType: 'education',
            name: 'PTU University — Bachelor of Business Administration (BBA)',
            title: 'Jalandhar, India',
            techStack: 'Business administration, Finance, General',
            summaryPoints: [
              'BBA with foundation in business administration and finance.'
            ],
            dateRange: 'Jun 2021 – Jun 2024'
          }
        ]);
      }
    }
    fetchTimelineItem();
  }, []);

  if (error && !timeLineData) return <div>Loading...</div>;
  if (!timeLineData) return <div>Loading...</div>;
  console.log("🚀 ~ timeLineData:", timeLineData)

  return (
    <>
      <div className="timeline-container">
        <h2 className="timeline-title">📅 Work Experience & Education Timeline</h2>
      </div>
      <VerticalTimeline>
        {timeLineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            className={`vertical-timeline-element--${item.timelineType}`}
            contentStyle={
              item.timelineType === "work"
                ? index === 0
                  ? { background: 'rgb(33, 150, 243)', color: '#fff' }
                  : { background: 'rgb(240, 240, 240)', color: '#fff' }
                : { background: 'rgb(255, 224, 230)', color: '#fff' } // Lighter red for education
            }
            contentArrowStyle={
              item.timelineType === "work"
                ? { borderRight: index === 0 ? '7px solid rgb(33, 150, 243)' : '7px solid rgb(240, 240, 240)' }
                : { borderRight: '7px solid rgb(255, 224, 230)' }
            }
            date={item.dateRange}
            iconStyle={
              item.timelineType === "work"
                ? { background: 'rgb(33, 150, 243)', color: '#fff' }
                : { background: 'rgb(255, 160, 200)', color: '#fff' } // Softer red for education icon
            }
            icon={item.timelineType === "work" ? <WorkIcon /> : <SchoolIcon />}
          >
            {item.timelineType === "work" ? (
              <div style={{ color: 'black' }}>
                <h3 className="vertical-timeline-element-title">{item.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{item.name}</h4>
                <p className="vertical-timeline-element-tech">🔧 {item.techStack}</p>
                <p>{item.summaryPoints}</p>
              </div>
            ) : (
              <div style={{ color: 'black' }}>
                <h3 className="vertical-timeline-element-title">{item.name}</h3>
                <h4 className="vertical-timeline-element-subtitle">{item.title}</h4>
                <p>{item.summaryPoints}</p>
              </div>
            )}
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </>
  );
};

export default WorkExperience;
