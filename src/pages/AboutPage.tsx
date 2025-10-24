import { Linkedin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ padding: '2rem', color: 'var(--text-color)', width: '50%', maxWidth: '70%' }}>
      <style>
        {`
          .linkedin-link {
            display: inline-flex;
            align-items: end;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
            line-height: 1;
            transition: text-decoration 0.2s ease;
          }
          .linkedin-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <h1 style={{ color: 'var(--primary-color)' }}>About This Project</h1>
      <p>
        This is a demo real-time event map built with React and Leaflet. It displays events from multiple sources on an interactive map where users can explore details by clicking on event markers.
      </p>
      <p>
        The app features a responsive layout, intuitive navigation, and a sidebar for event details. It’s powered by OpenStreetMap and developed with React / Framer / Express.js
      </p>
      <p>
        This is a demo project. If you’re interested in working together or have a project in mind, feel free to contact me via{' '}
        <a
          href="https://www.linkedin.com/in/lukas-baranovas-5034091b1/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-link"
        >
          <Linkedin size={18} style={{ marginRight: '6px', marginLeft: '6px' }} />
          LinkedIn
        </a>.
      </p>
    </div>
  );
};

export default AboutPage;
