import React, { useEffect, useState } from 'react';

export const CustomDynamicSection = ({ data }) => {
  if (!data) return null;

  const { title, subtitle, description, image_url } = data;

  return (
    <section className="custom-dynamic-section">
      <div className={`container custom-dynamic-section-grid ${image_url ? 'has-image' : ''}`}>
        <div className="custom-dynamic-copy reveal active">
          {subtitle && (
            <span className="section-tag-premium">{subtitle}</span>
          )}
          {title && (
            <h2 className="section-title-premium" dangerouslySetInnerHTML={{ __html: title }}></h2>
          )}
          {description && (
            <p className="section-desc-premium">{description}</p>
          )}
        </div>

        {image_url && (
          <div className="custom-dynamic-media reveal active">
            <img src={image_url} alt={title || 'Section artwork'} />
          </div>
        )}
      </div>
    </section>
  );
};

const DynamicPageSections = ({ page, excludeIds = [] }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchSections = async () => {
      try {
        const res = await fetch(`/api/content?page=${encodeURIComponent(page)}&t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          setSections(data);
        }
      } catch (err) {
        if (!cancelled) {
          setSections([]);
        }
      }
    };

    fetchSections();

    return () => {
      cancelled = true;
    };
  }, [page]);

  const excluded = new Set(excludeIds);
  const customSections = sections
    .filter((section) => section.visible !== false)
    .filter((section) => !excluded.has(section._id))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (customSections.length === 0) return null;

  return (
    <>
      {customSections.map((section) => (
        <CustomDynamicSection key={section._id} data={section} />
      ))}
    </>
  );
};

export default DynamicPageSections;
