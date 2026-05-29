import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  // Verify authorization
  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
    }
  }, [token, navigate]);

  // Fetch current section content
  useEffect(() => {
    if (!token) return;
    
    const fetchContent = async () => {
      setLoading(true);
      setError('');
      setMessage('');
      try {
        const res = await fetch(`/api/content/${activeSection}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to retrieve data.');
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [activeSection, token]);

  const handleInputChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetadataChange = (key, value) => {
    setContent(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
    }));
  };

  const handleArrayMetadataChange = (key, index, value) => {
    setContent(prev => {
      const arr = [...prev.metadata[key]];
      arr[index] = value;
      return {
        ...prev,
        metadata: {
          ...prev.metadata,
          [key]: arr
        }
      };
    });
  };

  const handleNestedObjectChange = (parentKey, key, value) => {
    setContent(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [parentKey]: {
          ...prev.metadata[parentKey],
          [key]: value
        }
      }
    }));
  };

  // Multer Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'File upload failed.');

      // Update image_url state
      handleInputChange('image_url', data.imageUrl);
      setMessage('Image uploaded successfully! Make sure to save changes.');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Submit content updates to database
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/content/${activeSection}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save content.');

      setMessage('Changes successfully saved in the database!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  if (!content) {
    return (
      <div className="page-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--text-main)' }}><i className="ri-loader-4-line ri-spin"></i> Loading Dashboard console...</h2>
      </div>
    );
  }

  // Define strict limits for countdown warnings
  const limits = {
    title: 70,
    subtitle: 40,
    description: 250
  };

  return (
    <>
      <div className="page-hero" style={{ paddingBottom: '30px' }}>
        <div className="container admin-hero-header">
          <div>
            <span className="section-tag">Security Console</span>
            <h1 className="page-hero-title" style={{ fontSize: '32px' }}>Content Control Center</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
            <i className="ri-logout-box-r-line"></i> <span>Log out</span>
          </button>
        </div>
      </div>

      <section className="content-page" style={{ paddingTop: '20px', paddingBottom: '120px' }}>
        <div className="container admin-dashboard-layout">
          
          {/* Dashboard Left Sidebar - Tab triggers */}
          <aside className="glass-card" style={{ padding: '20px', alignSelf: 'start', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '14px', color: 'var(--text-muted)' }}>Home Sections</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => setActiveSection('hero')} 
                className={`tech-tab ${activeSection === 'hero' ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '8px' }}
              >
                <i className="ri-home-line"></i> Hero Banner
              </button>
              <button 
                onClick={() => setActiveSection('stats')} 
                className={`tech-tab ${activeSection === 'stats' ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '8px' }}
              >
                <i className="ri-bar-chart-box-line"></i> Statistics
              </button>
              <button 
                onClick={() => setActiveSection('services')} 
                className={`tech-tab ${activeSection === 'services' ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '8px' }}
              >
                <i className="ri-database-2-line"></i> Core Services
              </button>
              <button 
                onClick={() => setActiveSection('whychooseus')} 
                className={`tech-tab ${activeSection === 'whychooseus' ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '8px' }}
              >
                <i className="ri-star-line"></i> Why Choose Us
              </button>
            </div>
          </aside>

          {/* Dashboard Main Workspace Form */}
          <div className="glass-card" style={{ padding: '34px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Edit {activeSection.toUpperCase()}</h2>
              {loading && <span style={{ fontSize: '13px', color: 'var(--primary)' }}><i className="ri-loader-4-line ri-spin"></i> Updating...</span>}
            </div>

            {/* Notification alert states */}
            {message && (
              <div style={{ background: 'rgba(143, 184, 74, 0.1)', border: '1px solid rgba(143, 184, 74, 0.2)', color: 'var(--accent)', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                <i className="ri-checkbox-circle-line" style={{ marginRight: '6px' }}></i> {message}
              </div>
            )}
            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                <i className="ri-error-warning-line" style={{ marginRight: '6px' }}></i> {error}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'grid', gap: '22px' }}>
              
              {/* Title Field (Limit 70 chars) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label">Section Title *</label>
                  <span style={{ 
                    fontSize: '11px', 
                    color: (content.title || '').length > limits.title ? '#ef4444' : 'var(--text-muted)' 
                  }}>
                    {(content.title || '').length}/{limits.title} characters
                  </span>
                </div>
                <input 
                  className="form-control"
                  type="text"
                  value={content.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Subtitle Field (Limit 40 chars) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label">Section Subtitle / Badge *</label>
                  <span style={{ 
                    fontSize: '11px', 
                    color: (content.subtitle || '').length > limits.subtitle ? '#ef4444' : 'var(--text-muted)' 
                  }}>
                    {(content.subtitle || '').length}/{limits.subtitle} characters
                  </span>
                </div>
                <input 
                  className="form-control"
                  type="text"
                  value={content.subtitle || ''}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  required
                />
              </div>

              {/* Description Field (Limit 250 chars) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label">Description Text *</label>
                  <span style={{ 
                    fontSize: '11px', 
                    color: (content.description || '').length > limits.description ? '#ef4444' : 'var(--text-muted)' 
                  }}>
                    {(content.description || '').length}/{limits.description} characters
                  </span>
                </div>
                <textarea 
                  className="form-control"
                  style={{ minHeight: '100px' }}
                  value={content.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              {/* Image Upload Input (if section supports image) */}
              {activeSection === 'hero' && (
                <div className="form-group" style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: '10px', border: '1px dashed var(--border)' }}>
                  <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Section Image / Visual Artwork</label>
                  
                  {content.image_url && (
                    <div style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Path:</span>
                      <code style={{ display: 'block', fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '6px', margin: '4px 0', borderRadius: '4px' }}>{content.image_url}</code>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                      id="uploadInput"
                    />
                    <label 
                      htmlFor="uploadInput" 
                      className="btn btn-secondary" 
                      style={{ padding: '8px 16px', fontSize: '13px', margin: 0, cursor: 'pointer' }}
                    >
                      <i className="ri-upload-cloud-line"></i> <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                    </label>
                    {uploading && <span style={{ fontSize: '12px', color: 'var(--primary)' }}><i className="ri-loader-4-line ri-spin"></i> Uploading asset...</span>}
                  </div>
                </div>
              )}

              {/* HERO Metadata lists edits */}
              {activeSection === 'hero' && content.metadata && (
                <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Hero Metadata Arrays</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Studio Kicker Tag *</label>
                    <input 
                      className="form-control"
                      type="text"
                      value={content.metadata.tag || ''}
                      onChange={(e) => handleMetadataChange('tag', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Rotating Title Keywords (Limit 5 items, max 30 chars each)</label>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {content.metadata.rotatingKeywords?.map((keyword, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '60px' }}>Item #{idx+1}</span>
                          <input 
                            className="form-control"
                            type="text"
                            value={keyword || ''}
                            onChange={(e) => handleArrayMetadataChange('rotatingKeywords', idx, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Trust Row Pills (Limit 3 items)</label>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {content.metadata.trustPills?.map((pill, idx) => (
                        <input 
                          key={idx}
                          className="form-control"
                          type="text"
                          value={pill || ''}
                          onChange={(e) => handleArrayMetadataChange('trustPills', idx, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STATS Metadata arrays edits */}
              {activeSection === 'stats' && content.metadata && (
                <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Numerical Stats List</h4>
                  
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {content.metadata.counters?.map((counter, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', display: 'grid', gap: '10px' }}>
                        <strong>Counter #{idx+1}</strong>
                        <div className="admin-counters-grid">
                          <div>
                            <label className="form-label" style={{ fontSize: '11px' }}>Label</label>
                            <input 
                              className="form-control"
                              type="text"
                              value={counter.label || ''}
                              onChange={(e) => {
                                const counters = [...content.metadata.counters];
                                counters[idx].label = e.target.value;
                                handleMetadataChange('counters', counters);
                              }}
                            />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: '11px' }}>Target</label>
                            <input 
                              className="form-control"
                              type="number"
                              value={counter.target || 0}
                              onChange={(e) => {
                                const counters = [...content.metadata.counters];
                                counters[idx].target = parseInt(e.target.value, 10) || 0;
                                handleMetadataChange('counters', counters);
                              }}
                            />
                          </div>
                          <div>
                            <label className="form-label" style={{ fontSize: '11px' }}>Suffix</label>
                            <input 
                              className="form-control"
                              type="text"
                              value={counter.suffix || ''}
                              onChange={(e) => {
                                const counters = [...content.metadata.counters];
                                counters[idx].suffix = e.target.value;
                                handleMetadataChange('counters', counters);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SERVICES Metadata edits */}
              {activeSection === 'services' && content.metadata && (
                <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Capability Stack Content</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Kicker Badge *</label>
                    <input 
                      className="form-control"
                      type="text"
                      value={content.metadata.badge || ''}
                      onChange={(e) => handleMetadataChange('badge', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Capability Section kicker *</label>
                    <input 
                      className="form-control"
                      type="text"
                      value={content.metadata.capabilityStack?.kicker || ''}
                      onChange={(e) => handleNestedObjectChange('capabilityStack', 'kicker', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Capability title *</label>
                    <input 
                      className="form-control"
                      type="text"
                      value={content.metadata.capabilityStack?.title || ''}
                      onChange={(e) => handleNestedObjectChange('capabilityStack', 'title', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Capability description *</label>
                    <textarea 
                      className="form-control"
                      style={{ minHeight: '80px' }}
                      value={content.metadata.capabilityStack?.description || ''}
                      onChange={(e) => handleNestedObjectChange('capabilityStack', 'description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* WHY CHOOSE US Metadata lists edits */}
              {activeSection === 'whychooseus' && content.metadata && (
                <div style={{ display: 'grid', gap: '18px', borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Value Proposition Checklist</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Kicker Badge *</label>
                    <input 
                      className="form-control"
                      type="text"
                      value={content.metadata.badge || ''}
                      onChange={(e) => handleMetadataChange('badge', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Checklist (Limit 3 items)</label>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {content.metadata.checklist?.map((item, idx) => (
                        <input 
                          key={idx}
                          className="form-control"
                          type="text"
                          value={item || ''}
                          onChange={(e) => handleArrayMetadataChange('checklist', idx, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Grid Metrics (Limit 4 items)</label>
                    <div className="admin-metrics-grid">
                      {content.metadata.metrics?.map((metric, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', display: 'grid', gap: '8px' }}>
                          <strong>Metric #{idx+1}</strong>
                          <div className="admin-metric-inputs">
                            <div>
                              <label className="form-label" style={{ fontSize: '10px' }}>Label</label>
                              <input 
                                className="form-control"
                                type="text"
                                value={metric.label || ''}
                                onChange={(e) => {
                                  const metrics = [...content.metadata.metrics];
                                  metrics[idx].label = e.target.value;
                                  handleMetadataChange('metrics', metrics);
                                }}
                              />
                            </div>
                            <div>
                              <label className="form-label" style={{ fontSize: '10px' }}>Value</label>
                              <input 
                                className="form-control"
                                type="text"
                                value={metric.value || ''}
                                onChange={(e) => {
                                  const metrics = [...content.metadata.metrics];
                                  metrics[idx].value = e.target.value;
                                  handleMetadataChange('metrics', metrics);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', border: 'none', height: '54px', marginTop: '12px' }}
                disabled={loading}
              >
                <span>{loading ? 'Saving Changes...' : 'Save Section Content'}</span>
                <i className="ri-save-3-line"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
