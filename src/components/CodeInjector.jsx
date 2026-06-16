import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const getPageFromPath = (path) => {
  const p = path.toLowerCase();
  if (p === '/' || p === '/index.html') return 'home';
  if (p.startsWith('/about')) return 'about';
  if (p.startsWith('/services')) return 'services';
  if (p.startsWith('/service/')) return 'service-detail';
  if (p.startsWith('/service-') && p.endsWith('.html')) return 'service-detail';
  if (p.startsWith('/technology-stack')) return 'technology-stack';
  if (p.startsWith('/portfolio/')) return 'project-detail';
  if (p.startsWith('/portfolio')) return 'portfolio';
  if (p.startsWith('/contact')) return 'contact';
  if (p.startsWith('/company-profile')) return 'company-profile';
  if (p.startsWith('/corporate')) return 'corporate';
  if (p.startsWith('/free-consultation')) return 'free-consultation';
  if (p.startsWith('/faqs')) return 'faqs';
  if (p.startsWith('/privacy-policy')) return 'privacy-policy';
  if (p.startsWith('/terms-conditions')) return 'terms-conditions';
  return '';
};

const cleanInjections = (type) => {
  const elements = document.querySelectorAll(`[data-injected="${type}"]`);
  elements.forEach(el => el.remove());
};

const injectCode = (html, target, type) => {
  if (!html || !html.trim()) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const nodes = Array.from(doc.head.childNodes).concat(Array.from(doc.body.childNodes));

  nodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node;
      const newEl = document.createElement(el.tagName);

      // Copy attributes
      Array.from(el.attributes).forEach(attr => {
        newEl.setAttribute(attr.name, attr.value);
      });

      // Mark element so it can be cleaned up
      newEl.setAttribute('data-injected', type);

      if (el.tagName === 'SCRIPT') {
        if (el.src) {
          newEl.src = el.src;
          newEl.async = el.async;
          newEl.defer = el.defer;
        } else {
          newEl.text = el.text;
        }
      } else {
        newEl.innerHTML = el.innerHTML;
      }

      target.appendChild(newEl);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const span = document.createElement('span');
      span.setAttribute('data-injected', type);
      span.textContent = node.textContent;
      target.appendChild(span);
    }
  });
};

const CodeInjector = () => {
  const location = useLocation();
  const [injections, setInjections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch all injections from the backend on mount
  useEffect(() => {
    const fetchInjections = async () => {
      try {
        const res = await fetch(`/api/code-injections?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          setInjections(data);
          setLoaded(true);
        }
      } catch (err) {
        console.error('Failed to load code injections:', err);
      }
    };
    fetchInjections();

    // Listen to potential updates triggered from the admin dashboard without reloading
    const handleUpdate = () => fetchInjections();
    window.addEventListener('code-injections-updated', handleUpdate);

    return () => {
      window.removeEventListener('code-injections-updated', handleUpdate);
    };
  }, []);

  // Run injection logic on page navigation
  useEffect(() => {
    if (!loaded) return;

    const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/admin-login';

    if (isAdminPage) {
      // For security, remove all custom injections when inside the admin control panel
      cleanInjections('global');
      cleanInjections('per-page');
      return;
    }

    // 1. Handle Global (All Pages) Injections
    // We only inject global scripts once, but if navigation occurs after unmounting admin panel, we re-inject them
    const globalHeadInjected = document.querySelector('[data-injected="global"]');
    if (!globalHeadInjected) {
      cleanInjections('global');
      const globalInj = injections.find(item => item.page === 'global');
      if (globalInj) {
        injectCode(globalInj.headCode, document.head, 'global');
        injectCode(globalInj.bodyCode, document.body, 'global');
      }
    }

    // 2. Handle Per-Page Injections
    // Remove previous page-specific injections
    cleanInjections('per-page');

    const currentPage = getPageFromPath(location.pathname);
    if (currentPage) {
      const pageInj = injections.find(item => item.page === currentPage);
      if (pageInj) {
        injectCode(pageInj.headCode, document.head, 'per-page');
        injectCode(pageInj.bodyCode, document.body, 'per-page');
      }
    }
  }, [location.pathname, injections, loaded]);

  return null; // This component has no visual output
};

export default CodeInjector;
