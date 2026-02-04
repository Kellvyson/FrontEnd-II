import { memo, useMemo } from 'react';
import type { Missionary } from '../../types';
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
  return (
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
            {/* useMemo evita recalcular a bandeira se o país não mudou */}
            <span className={styles.flag}>
              {useMemo(() => getCountryFlag(missionary.country), [missionary.country])}
            </span>
            <span>{missionary.country}</span>
          </div>
          <div className={styles.field}>
            {missionary.field}
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporta versão memoizada para otimizar performance
// React.memo faz shallow comparison das props e só re-renderiza se mudarem
export const MissionaryCard = memo(MissionaryCardBase);
