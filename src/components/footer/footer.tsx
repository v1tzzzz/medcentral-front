import { FaGithub } from 'react-icons/fa';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 MedCentral - Todos os direitos reservados</p>
        <a 
          href="https://github.com/v1tzzzz/medcentral-front.git" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub size={20} />
          <span>Ver no GitHub</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;