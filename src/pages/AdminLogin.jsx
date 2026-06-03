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
    <section className="admin-login-page" aria-labelledby="admin-login-title">
      <div className="admin-login-shell">
        <div className="admin-login-brand-panel">
          <img src="/assets/nex-infotech-logo.png" alt="Nexinfosoft IT Solutions" className="admin-login-logo" />
          <div>
            <span className="admin-login-eyebrow">Admin Console</span>
            <h1>Secure content management for Nexinfosoft.</h1>
            <p>
              Manage website sections, leads, portfolio entries, services, and page content from one protected dashboard.
            </p>
          </div>

          <div className="admin-login-highlights" aria-label="Admin dashboard features">
            <div>
              <i className="ri-shield-check-line"></i>
              <span>Protected Access</span>
            </div>
            <div>
              <i className="ri-dashboard-3-line"></i>
              <span>Live Content Control</span>
            </div>
            <div>
              <i className="ri-customer-service-2-line"></i>
              <span>Lead Management</span>
            </div>
          </div>
        </div>

        <div className="admin-login-card" role="form">
          <div className="admin-login-card-head">
            <div className="admin-login-icon">
              <i className="ri-shield-keyhole-line"></i>
            </div>
            <span>Authorized Entry Only</span>
            <h2 id="admin-login-title">Sign in to Dashboard</h2>
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              <i className="ri-error-warning-line"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-login-field">
              <label htmlFor="username">Username</label>
              <div className="admin-login-input-wrap">
                <i className="ri-user-3-line"></i>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required 
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="password">Password</label>
              <div className="admin-login-input-wrap">
                <i className="ri-lock-password-line"></i>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter security password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="admin-login-submit"
              disabled={loading}
            >
              <span>{loading ? 'Authorizing Access...' : 'Authenticate Login'}</span>
              <i className={loading ? 'ri-loader-4-line' : 'ri-lock-unlock-line'}></i>
            </button>
          </form>

          <p className="admin-login-note">
            Access is restricted to authorized Nexinfosoft administrators.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
