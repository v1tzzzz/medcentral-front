import { useState } from 'react';
import Navbar from '../../../components/navbar/navbar';
import './knowledgeBase.css';

interface KnowledgeBaseProps {
  nomeUsuario: string;
  onLogout: () => void;
}

interface Documento {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  url: string;
  dataCriacao: string;
  tamanho: string;
}

function KnowledgeBase({ 
  nomeUsuario, 
  irParaPerfil, 
  onLogout,
  irParaDashboard,
  irParaBaseConhecimento,
  irParaRastreamento
}: KnowledgeBaseProps) {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todos');
  const [buscaTexto, setBuscaTexto] = useState<string>('');

  const documentos: Documento[] = [
    {
      id: 1,
      titulo: 'Manual do Usuário - Sistema MedCentral',
      descricao: 'Guia completo de utilização do sistema de agendamento',
      categoria: 'Manuais',
      url: '/docs/manual-usuario.pdf',
      dataCriacao: '15/10/2025',
      tamanho: '2.5 MB'
    },
    {
      id: 2,
      titulo: 'Política de Privacidade',
      descricao: 'Termos de uso e proteção de dados do paciente',
      categoria: 'Políticas',
      url: '/docs/politica-privacidade.pdf',
      dataCriacao: '10/10/2025',
      tamanho: '1.2 MB'
    },
    {
      id: 3,
      titulo: 'Guia de Agendamento',
      descricao: 'Como agendar consultas e gerenciar horários',
      categoria: 'Tutoriais',
      url: '/docs/guia-agendamento.pdf',
      dataCriacao: '05/10/2025',
      tamanho: '3.1 MB'
    },
    {
      id: 4,
      titulo: 'FAQ - Perguntas Frequentes',
      descricao: 'Respostas para as dúvidas mais comuns',
      categoria: 'FAQs',
      url: '/docs/faq.pdf',
      dataCriacao: '01/10/2025',
      tamanho: '1.8 MB'
    },
    {
      id: 5,
      titulo: 'Procedimentos de Segurança',
      descricao: 'Protocolos de segurança e boas práticas',
      categoria: 'Políticas',
      url: '/docs/procedimentos-seguranca.pdf',
      dataCriacao: '28/09/2025',
      tamanho: '2.2 MB'
    },
    {
      id: 6,
      titulo: 'Guia de Recuperação de Senha',
      descricao: 'Passo a passo para recuperar acesso à conta',
      categoria: 'Tutoriais',
      url: '/docs/recuperacao-senha.pdf',
      dataCriacao: '25/09/2025',
      tamanho: '800 KB'
    }
  ];

  const categorias = ['Todos', ...Array.from(new Set(documentos.map(d => d.categoria)))];

  const documentosFiltrados = documentos.filter(doc => {
    const matchCategoria = categoriaFiltro === 'Todos' || doc.categoria === categoriaFiltro;
    const matchBusca = doc.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
                       doc.descricao.toLowerCase().includes(buscaTexto.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const abrirDocumento = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="knowledge-base-container">
      <Navbar 
        nomeUsuario={nomeUsuario} 
        irParaPerfil={irParaPerfil}
        onLogout={onLogout}
        irParaDashboard={irParaDashboard}
        irParaBaseConhecimento={irParaBaseConhecimento}
        irParaRastreamento={irParaRastreamento}
      />
      
      <main className="knowledge-base-main">
        <div className="knowledge-base-content">
          <div className="kb-header">
            <div className="kb-title-section">
              <h2>📚 Base de Conhecimento</h2>
              <p>Documentos, manuais e guias do MedCentral</p>
            </div>
          </div>

          <div className="kb-filters">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Buscar documentos..."
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={`filter-btn ${categoriaFiltro === categoria ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="documents-grid">
            {documentosFiltrados.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="document-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span className="doc-type">PDF</span>
                </div>
                
                <div className="document-info">
                  <span className="doc-category">{doc.categoria}</span>
                  <h3>{doc.titulo}</h3>
                  <p>{doc.descricao}</p>
                  
                  <div className="document-meta">
                    <span className="doc-date">📅 {doc.dataCriacao}</span>
                    <span className="doc-size">💾 {doc.tamanho}</span>
                  </div>
                </div>

                <button 
                  className="btn-open-doc"
                  onClick={() => abrirDocumento(doc.url)}
                >
                  Abrir Documento →
                </button>
              </div>
            ))}
          </div>

          {documentosFiltrados.length === 0 && (
            <div className="empty-state">
              <p>Nenhum documento encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default KnowledgeBase;