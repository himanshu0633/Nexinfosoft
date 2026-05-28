import React from 'react';

const Technologies = () => {
  return (
    <section className="technologies">
      <div className="container">
        <div className="section-header reveal slide-up active">
          <span className="section-tag">Technology Stack</span>
          <h2 className="section-title">Requirement-Based Technology Selection</h2>
          <p className="section-desc">We choose tools around business goals, integrations, performance requirements, and long-term maintainability.</p>
        </div>
        <div className="tech-marquee-stack reveal slide-up delay-100 active">
          <div className="marquee-container">
            <div className="marquee-content marquee-rtl">
              <div className="tech-logo"><i className="ri-reactjs-line" style={{ color: '#61dafb' }}></i> ReactJS</div>
              <div className="tech-logo"><i className="ri-angularjs-line" style={{ color: '#dd0031' }}></i> Angular</div>
              <div className="tech-logo"><i className="ri-vuejs-line" style={{ color: '#42b883' }}></i> Vue.js</div>
              <div className="tech-logo"><i className="ri-code-s-slash-line" style={{ color: '#0f766e' }}></i> Next.js</div>
              <div className="tech-logo"><i className="ri-javascript-line" style={{ color: '#f7df1e' }}></i> JavaScript</div>
              <div className="tech-logo"><i className="ri-code-box-line" style={{ color: '#3178c6' }}></i> TypeScript</div>
              <div className="tech-logo"><i className="ri-html5-line" style={{ color: '#e34f26' }}></i> HTML5</div>
              <div className="tech-logo"><i className="ri-css3-line" style={{ color: '#1572b6' }}></i> CSS3</div>
              <div className="tech-logo"><i className="ri-tailwind-css-line" style={{ color: '#38bdf8' }}></i> Tailwind</div>
              <div className="tech-logo"><i className="ri-smartphone-line" style={{ color: '#02569b' }}></i> Flutter</div>
            </div>
          </div>

          <div className="marquee-container">
            <div className="marquee-content marquee-ltr">
              <div className="tech-logo"><i className="ri-nodejs-line" style={{ color: '#68a063' }}></i> Node.js</div>
              <div className="tech-logo"><i className="ri-code-box-line" style={{ color: '#ff2d20' }}></i> Laravel</div>
              <div className="tech-logo"><i className="ri-database-2-line" style={{ color: '#4db33d' }}></i> MongoDB</div>
              <div className="tech-logo"><i className="ri-database-line" style={{ color: '#336791' }}></i> PostgreSQL</div>
              <div className="tech-logo"><i className="ri-server-line" style={{ color: '#4479a1' }}></i> MySQL</div>
              <div className="tech-logo"><i className="ri-cloud-line" style={{ color: '#ff9900' }}></i> AWS Cloud</div>
              <div className="tech-logo"><i className="ri-ship-line" style={{ color: '#2496ed' }}></i> Docker</div>
              <div className="tech-logo"><i className="ri-git-branch-line" style={{ color: '#f05032' }}></i> Git</div>
              <div className="tech-logo"><i className="ri-brain-line" style={{ color: '#8b5cf6' }}></i> AI/ML</div>
              <div className="tech-logo"><i className="ri-shield-check-line" style={{ color: '#0f766e' }}></i> Security</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
