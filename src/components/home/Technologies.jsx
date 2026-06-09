import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Technologies = ({ previewData = null }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: 'Requirement-Based Technology Selection',
    subtitle: 'Technology Stack',
    description: 'We choose tools around business goals, integrations, performance requirements, and long-term maintainability.'
  });

  const [row1, setRow1] = useState([
    { name: 'ReactJS', icon: 'ri-reactjs-line', color: '#61dafb' },
    { name: 'Angular', icon: 'ri-angularjs-line', color: '#dd0031' },
    { name: 'Vue.js', icon: 'ri-vuejs-line', color: '#42b883' },
    { name: 'Next.js', icon: 'ri-code-s-slash-line', color: '#000000' },
    { name: 'TypeScript', icon: 'ri-code-box-line', color: '#3178c6' },
    { name: 'JavaScript', icon: 'ri-javascript-line', color: '#f7df1e' },
    { name: 'HTML5', icon: 'ri-html5-line', color: '#e34f26' },
    { name: 'CSS3', icon: 'ri-css3-line', color: '#1572b6' },
    { name: 'Tailwind CSS', icon: 'ri-tailwind-css-line', color: '#38bdf8' },
    { name: 'Bootstrap', icon: 'ri-bootstrap-line', color: '#7952b3' },
  ]);

  const [row2, setRow2] = useState([
    { name: 'Node.js', icon: 'ri-nodejs-line', color: '#68a063' },
    { name: 'PHP', icon: 'ri-code-box-line', color: '#777bb4' },
    { name: 'Laravel', icon: 'ri-code-box-line', color: '#ff2d20' },
    { name: 'Python', icon: 'ri-terminal-box-line', color: '#3776ab' },
    { name: 'Spring Boot', icon: 'ri-leaf-line', color: '#6db33f' },
    { name: 'Java', icon: 'ri-cup-line', color: '#5382a1' },
    { name: 'MySQL', icon: 'ri-server-line', color: '#4479a1' },
    { name: 'PostgreSQL', icon: 'ri-database-2-line', color: '#336791' },
    { name: 'MongoDB', icon: 'ri-database-line', color: '#4db33d' },
    { name: 'Firebase', icon: 'ri-fire-line', color: '#ffca28' },
  ]);

  const [row3, setRow3] = useState([
    { name: 'Flutter', icon: 'ri-smartphone-line', color: '#02569b' },
    { name: 'React Native', icon: 'ri-reactjs-line', color: '#61dafb' },
    { name: 'iOS Apps', icon: 'ri-apple-line', color: '#000000' },
    { name: 'Android Apps', icon: 'ri-android-line', color: '#3ddc84' },
    { name: 'AWS Cloud', icon: 'ri-cloud-line', color: '#ff9900' },
    { name: 'Docker', icon: 'ri-ship-line', color: '#2496ed' },
    { name: 'Git & GitHub', icon: 'ri-github-line', color: '#f05032' },
    { name: 'Jenkins / CI-CD', icon: 'ri-settings-5-line', color: '#d24939' },
    { name: 'AI / ML / LLMs', icon: 'ri-brain-line', color: '#8b5cf6' },
    { name: 'Power BI', icon: 'ri-bar-chart-box-line', color: '#f2c811' },
  ]);

  useEffect(() => {
    const fetchTechItems = async () => {
      try {
        const res = await fetch('/api/techstack');
        if (res.ok) {
          const json = await res.json();
          if (json && json.length > 0) {
            const r1 = [];
            const r2 = [];
            const r3 = [];
            json.forEach((item, idx) => {
              const formattedItem = {
                name: item.name,
                icon: item.icon || 'ri-code-line',
                color: item.color || 'var(--accent)'
              };
              if (idx % 3 === 0) r1.push(formattedItem);
              else if (idx % 3 === 1) r2.push(formattedItem);
              else r3.push(formattedItem);
            });
            setRow1(r1);
            setRow2(r2);
            setRow3(r3);
          }
        }
      } catch (err) {
        // Fallback handled by default state
      }
    };

    fetchTechItems();
  }, []);

  useEffect(() => {
    if (previewData) {
      setData(previewData);
    } else {
      const fetchTechContent = async () => {
        try {
          const res = await fetch('/api/content/technologies');
          if (res.ok) {
            const json = await res.json();
            setData(json);
          }
        } catch (err) {
          // Fallback handled by default state
        }
      };
      fetchTechContent();
    }
  }, [previewData]);

  // Map technologies to their respective categories and highlight card text on the Tech Stack page
  const handleTechClick = (techName) => {
    const mapping = {
      'ReactJS': { tab: 'frontend', highlight: 'ReactJS' },
      'React': { tab: 'frontend', highlight: 'React' },
      'Angular': { tab: 'frontend', highlight: 'Angular' },
      'Vue.js': { tab: 'frontend', highlight: 'Vue.js' },
      'Next.js': { tab: 'frontend', highlight: 'ReactJS' },
      'TypeScript': { tab: 'frontend', highlight: 'TypeScript' },
      'JavaScript': { tab: 'frontend', highlight: 'JavaScript' },
      'HTML5': { tab: 'frontend', highlight: 'HTML5' },
      'CSS3': { tab: 'frontend', highlight: 'CSS3' },
      'Tailwind CSS': { tab: 'frontend', highlight: 'TailwindCSS' },
      'Bootstrap': { tab: 'frontend', highlight: 'Bootstrap' },
      
      'Node.js': { tab: 'backend', highlight: 'Node.js' },
      'PHP': { tab: 'backend', highlight: 'PHP' },
      'Laravel': { tab: 'backend', highlight: 'Laravel' },
      'Python': { tab: 'backend', highlight: 'Python' },
      'Spring Boot': { tab: 'backend', highlight: 'Spring Boot' },
      'Java': { tab: 'backend', highlight: 'Java' },
      
      'MySQL': { tab: 'database', highlight: 'MySQL' },
      'PostgreSQL': { tab: 'database', highlight: 'PostgreSQL' },
      'MongoDB': { tab: 'database', highlight: 'MongoDB' },
      'Firebase': { tab: 'database', highlight: 'Firebase' },
      
      'Flutter': { tab: 'mobile', highlight: 'Flutter' },
      'React Native': { tab: 'mobile', highlight: 'React Native' },
      'iOS Apps': { tab: 'mobile', highlight: 'iOS' },
      'Android Apps': { tab: 'mobile', highlight: 'Android' },
      
      'AWS Cloud': { tab: 'cloud', highlight: 'Cloud Deployment' },
      'Docker': { tab: 'cloud', highlight: 'Docker' },
      'Git & GitHub': { tab: 'cloud', highlight: 'GitHub' },
      'Jenkins / CI-CD': { tab: 'cloud', highlight: 'Jenkins' },
      
      'AI / ML / LLMs': { tab: 'ai', highlight: 'AI/ML' },
      'Power BI': { tab: 'ai', highlight: 'Power BI' }
    };

    const target = mapping[techName];
    if (target) {
      navigate(`/technology-stack?tab=${target.tab}&highlight=${encodeURIComponent(target.highlight)}`);
    } else {
      navigate('/technology-stack');
    }
  };

  const duplicateList = (list) => [...list, ...list, ...list];

  const techBrandColors = {
    'next.js': '#000000',
    react: '#61dafb',
    reactjs: '#61dafb',
    'react native': '#61dafb',
    flutter: '#02569b',
    'spring boot': '#6db33f',
    java: '#e76f00',
    python: '#3776ab',
    php: '#777bb4',
    laravel: '#ff2d20',
    'node.js': '#68a063',
    nodejs: '#68a063',
    tailwindcss: '#38bdf8',
    'tailwind css': '#38bdf8',
    typescript: '#3178c6',
    angular: '#dd0031',
    'vue.js': '#42b883',
    vue: '#42b883',
    'machine learning': '#14b8a6',
    'ai chatbots': '#8b5cf6',
    'generative ai': '#f59e0b',
    'predictive systems': '#3b82f6',
    'power bi integration': '#f2c811',
    'workflow automations': '#8fba4a',
    cloudflare: '#f38020',
    'vps deployments': '#ef4444',
    'github actions': '#24292f',
    'ci/cd pipelines': '#10b981',
    kubernetes: '#326ce5',
    docker: '#2496ed',
    aws: '#ff9900',
    redis: '#dc382d',
    firebase: '#ffca28',
    mysql: '#4479a1',
    postgresql: '#336791',
    mongodb: '#47a248',
    'ios native': '#111827',
    'android native': '#3ddc84'
  };

  const getTechColor = (tech) => {
    const brandColor = techBrandColors[String(tech.name || '').trim().toLowerCase()];
    return brandColor || tech.color || 'var(--accent)';
  };

  return (
    <section className="technologies">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">{data.subtitle || 'Technology Stack'}</span>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-desc">{data.description}</p>
        </div>

        <div className="tech-marquee-stack reveal slide-up delay-100 active">
          {/* Row 1: Right to Left */}
          {row1.length > 0 && (
            <div className="marquee-container">
              <div className="marquee-content marquee-rtl">
                {duplicateList(row1).map((tech, idx) => (
                  (() => {
                    const iconColor = getTechColor(tech);
                    return (
                  <div 
                    key={`row1-${idx}`} 
                    className="tech-logo-card"
                    onClick={() => handleTechClick(tech.name)}
                    style={{ '--hover-color': iconColor, '--tech-color': iconColor }}
                  >
                    <i className={tech.icon}></i>
                    <span>{tech.name}</span>
                  </div>
                    );
                  })()
                ))}
              </div>
            </div>
          )}

          {/* Row 2: Left to Right */}
          {row2.length > 0 && (
            <div className="marquee-container">
              <div className="marquee-content marquee-ltr">
                {duplicateList(row2).map((tech, idx) => (
                  (() => {
                    const iconColor = getTechColor(tech);
                    return (
                  <div 
                    key={`row2-${idx}`} 
                    className="tech-logo-card"
                    onClick={() => handleTechClick(tech.name)}
                    style={{ '--hover-color': iconColor, '--tech-color': iconColor }}
                  >
                    <i className={tech.icon}></i>
                    <span>{tech.name}</span>
                  </div>
                    );
                  })()
                ))}
              </div>
            </div>
          )}

          {/* Row 3: Right to Left */}
          {row3.length > 0 && (
            <div className="marquee-container">
              <div className="marquee-content marquee-rtl">
                {duplicateList(row3).map((tech, idx) => (
                  (() => {
                    const iconColor = getTechColor(tech);
                    return (
                  <div 
                    key={`row3-${idx}`} 
                    className="tech-logo-card"
                    onClick={() => handleTechClick(tech.name)}
                    style={{ '--hover-color': iconColor, '--tech-color': iconColor }}
                  >
                    <i className={tech.icon}></i>
                    <span>{tech.name}</span>
                  </div>
                    );
                  })()
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Technologies;
