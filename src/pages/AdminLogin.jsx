import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already authorized, skip direct to dashboard
    if (localStorage.getItem('adminToken')) {
      navigate('/admin/dashboard');
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login authorization failed.');
      }

      // Save token & redirect
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', data.user.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Security Console</span>
          <h1 className="page-hero-title">Admin Access Portal</h1>
          <p className="page-hero-desc">Secure authorization required to modify system databases and section copy.</p>
        </div>
      </div>

      <section className="content-page" style={{ paddingBottom: '160px' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="glass-card" style={{ padding: '40px', borderRadius: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <i className="ri-shield-keyhole-line" style={{ fontSize: '48px', color: 'var(--primary)' }}></i>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '12px' }}>Authorized Entry Only</h2>
            </div>

            {error && (
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', 
                color: '#ef4444', 
                padding: '12px', 
                borderRadius: '8px', 
                fontSize: '13px', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <i className="ri-error-warning-line" style={{ marginRight: '6px', verticalAlign: 'middle' }}></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" htmlFor="username">Username</label>
                <input 
                  className="form-control" 
                  type="text" 
                  id="username" 
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label" htmlFor="password">Password</label>
                <input 
                  className="form-control" 
                  type="password" 
                  id="password" 
                  placeholder="Enter security password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', border: 'none' }}
                disabled={loading}
              >
                <span>{loading ? 'Authorizing Access...' : 'Authenticate Login'}</span>
                <i className="ri-lock-unlock-line"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
