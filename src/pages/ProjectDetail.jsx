import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeProjectSlug } from '../utils/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProject = async () => {
      try {
        const response = await fetch(`/api/projects/${encodeURIComponent(slug)}`);
        if (response.ok) {
          setProject(await response.json());
          return;
        }

        const projectsResponse = await fetch('/api/projects');
        if (!projectsResponse.ok) return;

        const projects = await projectsResponse.json();
        const matchingProject = projects.find((item) => (
          item._id === slug
          || item.slug === slug
          || makeProjectSlug(item.name) === slug
        ));
        setProject(matchingProject || null);
      } catch (error) {} finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (loading) {
    return <div className="project-detail-state">Loading project...</div>;
  }

  if (!project) {
    return (
      <div className="project-detail-state">
        <i className="ri-folder-warning-line"></i>
        <h1>Project not found</h1>
        <Link to="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
      </div>
    );
  }

  const challenges = project.challenges || [];
  const results = project.results || [];
  const rating = Math.min(5, Math.max(1, Number(project.clientRating) || 5));

  return (
    <div className="project-detail-page">
      <section className="project-detail-hero">
        <div className="container project-detail-hero-grid">
          <div>
            <Link to="/portfolio" className="project-detail-back"><i className="ri-arrow-left-line"></i> Portfolio</Link>
            <span className="section-tag-premium">{project.tag || project.category}</span>
            <h1>{project.name}</h1>
            {project.overview && <p>{project.overview}</p>}
            <div className="project-detail-techs">
              {(project.techs || []).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </div>
          <div className="project-detail-visual">
            {project.image_url
              ? <img src={project.image_url} alt={project.name} />
              : <i className={project.icon || 'ri-briefcase-4-line'}></i>}
          </div>
        </div>
      </section>

      <section className="project-detail-section">
        <div className="container project-detail-content-grid">
          {project.overview && (
            <article className="project-detail-card project-detail-overview">
              <span className="project-detail-number">01</span>
              <h2>Project Overview</h2>
              <p>{project.overview}</p>
            </article>
          )}
          {challenges.length > 0 && (
            <article className="project-detail-card">
              <span className="project-detail-number">02</span>
              <h2>Challenges</h2>
              <ul>{challenges.map((item) => <li key={item}><i className="ri-checkbox-circle-line"></i>{item}</li>)}</ul>
            </article>
          )}
          {project.solution && (
            <article className="project-detail-card">
              <span className="project-detail-number">03</span>
              <h2>Our Solution</h2>
              <p>{project.solution}</p>
            </article>
          )}
          {results.length > 0 && (
            <article className="project-detail-card">
              <span className="project-detail-number">04</span>
              <h2>Project Results</h2>
              <ul>{results.map((item) => <li key={item}><i className="ri-arrow-right-circle-line"></i>{item}</li>)}</ul>
            </article>
          )}
        </div>
      </section>

      {project.clientReview && (
        <section className="project-review-section">
          <div className="container">
            <div className="project-review-card">
              <i className="ri-double-quotes-l project-review-quote"></i>
              <div className="project-review-stars">
                {Array.from({ length: rating }).map((_, index) => <i key={index} className="ri-star-fill"></i>)}
              </div>
              <blockquote>{project.clientReview}</blockquote>
              {project.clientName && <strong>{project.clientName}</strong>}
              <span>{[project.clientRole, project.clientCompany].filter(Boolean).join(' · ')}</span>
            </div>
          </div>
        </section>
      )}

      <section className="project-detail-cta">
        <div className="container">
          <div className="project-detail-cta-box">
            <div><span className="section-tag-premium">START YOUR PROJECT</span><h2>Have a similar idea?</h2></div>
            <Link to="/contact" className="btn btn-primary"><span>Discuss Your Project</span><i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
