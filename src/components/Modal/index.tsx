import { memo, useEffect } from 'react';
import type { ReactNode } from 'react';
import styles from './Modal.module.css';

// Interface que define as props do Modal (Dumb Component)
// Este é um componente de apresentação puro, sem lógica de negócio
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Componente base do Modal (antes da memoização)
// Responsável apenas pela apresentação e interações básicas
function ModalBase({ children, isOpen, onClose, title }: ModalProps) {
  // useEffect para gerenciar eventos de teclado e scroll do body
  useEffect(() => {
    // Função que fecha o modal ao pressionar ESC
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Quando o modal está aberto:
    // - Adiciona listener para tecla ESC
    // - Previne scroll no body
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    // Cleanup: remove listener e restaura scroll
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Se o modal não está aberto, não renderiza nada
  if (!isOpen) return null;

  // Função que fecha o modal ao clicar no backdrop (fora do modal)
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Verifica se o clique foi no overlay (não no conteúdo do modal)
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Fechar modal"
              type="button"
            >
              ×
            </button>
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Exporta versão memoizada para otimizar re-renderizações
// O componente só re-renderiza se as props mudarem
export const Modal = memo(ModalBase);
