import { memo } from "react";
import type { Letter } from '../../types';
import styles from './LetterCard.module.css';

interface LetterCardProps {
  letter: Letter;
}

// Função utilitária para formatar data em português brasileiro
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Componente base (antes da memoização)
// React.memo evita re-renderizações desnecessárias quando as props não mudam
function LetterCardBase({ letter }: LetterCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.senderInfo}>
          <h3 className={styles.senderName}>De: {letter.senderName}</h3>
          <span className={styles.date}>{formatDate(letter.date)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.letterContent}>{letter.content}</p>
      </div>

      {/* Renderização condicional do versículo bíblico */}
      {letter.verse && (
        <div className={styles.verseSection}>
          <blockquote className={styles.verseText}>
            "{letter.verse.text}"
          </blockquote>
          <cite className={styles.verseReference}>
            {letter.verse.reference}
          </cite>
        </div>
      )}
    </div>
  );
}

// Exporta versão memoizada para otimizar performance
// Previne re-renderizações quando as props não mudaram
export const LetterCard = memo(LetterCardBase);
