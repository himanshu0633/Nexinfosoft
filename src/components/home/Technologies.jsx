import React from 'react';
import { useNavigate } from 'react-router-dom';

const Technologies = () => {
  const navigate = useNavigate();

  const row1 = [
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
  ];

  const row2 = [
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
  ];

  const row3 = [
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
  ];

  // Map technologies to their respective categories and highlight card text on the Tech Stack page
  const handleTechClick = (techName) => {
    const mapping = {
      'ReactJS': { tab: 'frontend', highlight: 'ReactJS' },
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

  // Duplicate list elements to ensure continuous smooth infinite scrolling
  const duplicateList = (list) => [...list, ...list, ...list];

  return (
    <section className="technologies">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Technology Stack</span>
          <h2 className="section-title">Requirement-Based Technology Selection</h2>
          <p className="section-desc">We choose tools around business goals, integrations, performance requirements, and long-term maintainability.</p>
        </div>

        <div className="tech-marquee-stack reveal slide-up delay-100 active">
          {/* Row 1: Right to Left */}
          <div className="marquee-container">
            <div className="marquee-content marquee-rtl">
              {duplicateList(row1).map((tech, idx) => (
                <div 
                  key={`row1-${idx}`} 
                  className="tech-logo-card"
                  onClick={() => handleTechClick(tech.name)}
                  style={{ '--hover-color': tech.color }}
                >
                  <i className={tech.icon} style={{ color: tech.color }}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="marquee-container">
            <div className="marquee-content marquee-ltr">
              {duplicateList(row2).map((tech, idx) => (
                <div 
                  key={`row2-${idx}`} 
                  className="tech-logo-card"
                  onClick={() => handleTechClick(tech.name)}
                  style={{ '--hover-color': tech.color }}
                >
                  <i className={tech.icon} style={{ color: tech.color }}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Right to Left */}
          <div className="marquee-container">
            <div className="marquee-content marquee-rtl">
              {duplicateList(row3).map((tech, idx) => (
                <div 
                  key={`row3-${idx}`} 
                  className="tech-logo-card"
                  onClick={() => handleTechClick(tech.name)}
                  style={{ '--hover-color': tech.color }}
                >
                  <i className={tech.icon} style={{ color: tech.color }}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Technologies;
