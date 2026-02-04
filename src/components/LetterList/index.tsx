import { useLetters } from "../../hooks/useLetters";
import { LetterCard } from "../LetterCard";
import styles from "./LetterList.module.css";

// Componente de listagem de cartas
// Exibe cartas ordenadas por data (mais recentes primeiro)
export function LetterList() {
  const { letters, loading } = useLetters();

  // Estado de carregamento
  if (loading) {
    return <div className={styles.loading}>Carregando cartas...</div>;
  }

  // Estado vazio - quando não há cartas ainda
  if (letters.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Nenhuma Carta Ainda</h3>
        <p>
          Seja o primeiro a escrever uma carta de encorajamento para um
          missionário!
        </p>
      </div>
    );
  }

  // Ordena cartas por data (mais recentes primeiro)
  const sortedLetters = [...letters].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cartas enviadas</h2>
      {/* Grid responsivo para exibição dos cards de cartas */}
      <div className={styles.letterGrid}>
        {sortedLetters.map((letter) => (
          // LetterCard é memoizado, evita re-renders desnecessários
          <LetterCard key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}

export default LetterList;
