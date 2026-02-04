import styles from './LetterListSkeleton.module.css';

// Componente Skeleton para LetterList
// Exibe placeholders animados enquanto os dados reais são carregados
// Melhora a experiência do usuário evitando "tela branca" durante o loading
export function LetterListSkeleton() {
  return (
    <div className={styles.container}>
      {/* Placeholder do título */}
      <div className={styles.titleSkeleton}></div>
      {/* Grid de 4 cards skeleton */}
      <div className={styles.letterGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.card}>
            {/* Placeholder do header */}
            <div className={styles.header}>
              <div className={styles.senderInfo}>
                <div className={styles.senderNameSkeleton}></div>
                <div className={styles.dateSkeleton}></div>
              </div>
            </div>

            {/* Placeholder do conteúdo da carta */}
            <div className={styles.content}>
              <div className={styles.contentLine}></div>
              <div className={styles.contentLine}></div>
              <div className={styles.contentLine} style={{ width: '75%' }}></div>
            </div>

            {/* Placeholder do versículo */}
            <div className={styles.verseSection}>
              <div className={styles.verseLine}></div>
              <div className={styles.verseLine} style={{ width: '60%' }}></div>
              <div className={styles.verseReference}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
