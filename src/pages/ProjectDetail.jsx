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
  const detailCards = [
    project.overview && {
      number: '01',
      icon: 'ri-file-list-3-line',
      title: 'Project Overview',
      body: project.overview
    },
    challenges.length > 0 && {
      number: '02',
      icon: 'ri-error-warning-line',
      title: 'Challenges',
      list: challenges,
      listIcon: 'ri-checkbox-circle-line'
    },
    project.solution && {
      number: '03',
      icon: 'ri-lightbulb-line',
      title: 'Our Solution',
      body: project.solution
    },
    results.length > 0 && {
      number: '04',
      icon: 'ri-bar-chart-grouped-line',
      title: 'Project Results',
      list: results,
      listIcon: 'ri-checkbox-circle-line'
    }
  ].filter(Boolean);

  return (
    <div className="project-detail-page">
      <section className="project-detail-hero">
        <div className="container project-detail-hero-grid">
          <div>
            <Link to="/portfolio" className="project-detail-back"><i className="ri-arrow-left-line"></i> Back to Portfolio</Link>
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
          {detailCards.map((card) => (
            <article key={card.number} className="project-detail-card">
              <div className="project-detail-card-side">
                <span className="project-detail-number">{card.number}</span>
                <i className={`project-detail-card-icon ${card.icon}`}></i>
              </div>
              <div>
                <h2>{card.title}</h2>
                {card.body && <p>{card.body}</p>}
                {card.list && (
                  <ul>
                    {card.list.map((item) => (
                      <li key={item}><i className={card.listIcon}></i>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {project.clientReview && (
        <section className="project-review-section">
          <div className="container">
            <div className="project-review-card">
              <button className="project-review-arrow project-review-arrow-left" type="button" aria-label="Previous review">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <i className="ri-double-quotes-l project-review-quote"></i>
              <div className="project-review-stars">
                {Array.from({ length: rating }).map((_, index) => <i key={index} className="ri-star-fill"></i>)}
              </div>
              <blockquote>{project.clientReview}</blockquote>
              {project.clientName && <strong>{project.clientName}</strong>}
              <span>{[project.clientRole, project.clientCompany].filter(Boolean).join(' · ')}</span>
              <div className="project-review-dots" aria-hidden="true">
                <span className="active"></span>
                <span></span>
                <span></span>
              </div>
              <button className="project-review-arrow project-review-arrow-right" type="button" aria-label="Next review">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="project-detail-cta">
        <div className="container">
          <div className="project-detail-cta-box">
            <div className="project-detail-cta-icon"><i className="ri-send-plane-fill"></i></div>
            <div><span className="section-tag-premium">START YOUR PROJECT</span><h2>Have a similar idea?</h2><p>Let's build a solution that drives your business forward.</p></div>
            <Link to="/contact" className="btn btn-primary"><span>Discuss Your Project</span><i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
