import styles from './MissionaryListSkeleton.module.css';

// Componente Skeleton para MissionaryList
// Exibe placeholders animados enquanto os dados reais são carregados
// Melhora a experiência do usuário evitando "tela branca" durante o loading
export function MissionaryListSkeleton() {
  return (
    <div className={styles.container}>
      {/* Placeholder do título */}
      <div className={styles.titleSkeleton}></div>
      {/* Grid de 6 cards skeleton */}
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.cardWrapper}>
            <div className={styles.card}>
              {/* Placeholder da imagem */}
              <div className={styles.imageContainer}>
                <div className={styles.imageSkeleton}></div>
              </div>
              {/* Placeholder do conteúdo */}
              <div className={styles.content}>
                <div className={styles.nameSkeleton}></div>
                <div className={styles.bioSkeleton}></div>
                <div className={styles.bioSkeleton} style={{ width: '80%' }}></div>
                <div className={styles.details}>
                  <div className={styles.countrySkeleton}></div>
                  <div className={styles.fieldSkeleton}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
