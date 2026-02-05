import { memo, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Missionary } from '../../types';
import { useLetters } from '../../hooks/useLetters';
import styles from './MissionaryCard.module.css';

interface MissionaryCardProps {
  missionary: Missionary;
}

// Função utilitária para obter a bandeira do país
// useMemo é usado para evitar recalcular a bandeira em cada render
const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    'Camboja': '🇰🇭',
    'Indonésia': '🇮🇩',
    'Espanha': '🇪🇸',
    'Brasil': '🇧🇷',
    'Estados Unidos': '🇺🇸',
    'França': '🇫🇷',
    'Alemanha': '🇩🇪',
    'Japão': '🇯🇵',
    'China': '🇨🇳',
    'Índia': '🇮🇳'
  };
  return flags[country] || '🌍';
};

// Componente base (antes da memoização)
// React.memo evita re-renderizações desnecessárias quando as props não mudam
function MissionaryCardBase({ missionary }: MissionaryCardProps) {
  // Estado para controlar se o card está flipado
  const [isFlipped, setIsFlipped] = useState(false);

  // Estado para controlar qual carta está sendo exibida
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  // Busca todas as cartas e filtra as deste missionário
  const { letters } = useLetters();
  const missionaryLetters = letters.filter(letter => letter.missionaryId === missionary.id);

  // Funções de navegação entre cartas
  const handlePrevLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLetterIndex(prev => (prev > 0 ? prev - 1 : missionaryLetters.length - 1));
  };

  const handleNextLetter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentLetterIndex(prev => (prev < missionaryLetters.length - 1 ? prev + 1 : 0));
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setCurrentLetterIndex(0);
  };

  const currentLetter = missionaryLetters[currentLetterIndex];

  return (
    <div className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`}>
      {/* Lado da frente - Informações do missionário */}
      <div className={styles.cardFront} onClick={() => missionaryLetters.length > 0 && setIsFlipped(true)}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={missionary.imageUrl}
              alt={`Foto de ${missionary.name}`}
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <h3 className={styles.name}>{missionary.name}</h3>
            <p className={styles.bio}>{missionary.bio}</p>

            <div className={styles.details}>
              <div className={styles.country}>
                <span className={styles.flag}>
                  {useMemo(() => getCountryFlag(missionary.country), [missionary.country])}
                </span>
                <span>{missionary.country}</span>
              </div>
              <div className={styles.field}>
                {missionary.field}
              </div>
            </div>

            {/* Indicador de cartas disponíveis */}
            {missionaryLetters.length > 0 && (
              <div className={styles.letterIndicator}>
                {missionaryLetters.length} {missionaryLetters.length === 1 ? 'carta' : 'cartas'} - clique para ver
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lado de trás - Cartas do missionário */}
      <div className={styles.cardBack}>
        <div className={styles.card}>
          {/* Botão fechar */}
          <button className={styles.closeButton} onClick={handleClose} aria-label="Fechar">
            <X size={24} />
          </button>

          {currentLetter ? (
            <>
              <div className={styles.letterHeader}>
                <h3 className={styles.letterTitle}>Carta para {missionary.name}</h3>
                <p className={styles.letterFrom}>De: {currentLetter.senderName}</p>
                <p className={styles.letterDate}>
                  {new Date(currentLetter.date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className={styles.letterContent}>
                <p>{currentLetter.content}</p>
              </div>

              {currentLetter.verse && (
                <div className={styles.letterVerse}>
                  <p className={styles.verseText}>"{currentLetter.verse.text}"</p>
                  <p className={styles.verseReference}>— {currentLetter.verse.reference}</p>
                </div>
              )}

              {/* Navegação entre cartas */}
              {missionaryLetters.length > 1 && (
                <div className={styles.navigation}>
                  <button onClick={handlePrevLetter} className={styles.navButton} aria-label="Carta anterior">
                    <ChevronLeft size={20} />
                  </button>
                  <span className={styles.navIndicator}>
                    {currentLetterIndex + 1} / {missionaryLetters.length}
                  </span>
                  <button onClick={handleNextLetter} className={styles.navButton} aria-label="Próxima carta">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noLetters}>
              <p>Nenhuma carta ainda para este missionário.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Exporta versão memoizada para otimizar performance
// React.memo faz shallow comparison das props e só re-renderiza se mudarem
export const MissionaryCard = memo(MissionaryCardBase);
