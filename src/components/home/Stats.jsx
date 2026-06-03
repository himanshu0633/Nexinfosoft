import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
          start += Math.ceil(target / (duration / stepTime));
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, stepTime);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <div ref={elementRef} className="stat-num">
      {count}{suffix}
    </div>
  );
};

const Stats = ({ previewData = null }) => {
  const [data, setData] = useState({
    metadata: {
      counters: [
        { target: 100, suffix: '+', label: 'Projects Completed' },
        { target: 50, suffix: '+', label: 'Happy Clients' },
        { target: 5, suffix: '+', label: 'Years Experience' },
        { target: 99, suffix: '%', label: 'Client Retention' }
      ]
    }
  });

  useEffect(() => {
    if (previewData) {
      setData(previewData);
      return;
    }

    const fetchStatsContent = async () => {
      try {
        const res = await fetch('/api/content/stats');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        // Fallback is already handled by default state
      }
    };
    fetchStatsContent();
  }, [previewData]);

  return (
    <section className="stats">
      <div className="container stats-grid reveal scale-up active">
        {data.metadata?.counters?.map((counter, idx) => (
          <div key={idx} className="stat-item">
            <AnimatedCounter target={counter.target} suffix={counter.suffix} />
            <div className="stat-label">{counter.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
