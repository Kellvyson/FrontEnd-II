import { useMissionaries } from "../../hooks/useMissionaries";
import { MissionaryCard } from "../MissionaryCard";
import styles from "./MissionaryList.module.css";

// Componente de listagem de missionários
// Consome dados via hook customizado e renderiza cards individuais
export function MissionaryList() {
  const { missionaries, loading } = useMissionaries();

  // Estado de carregamento
  if (loading) {
    return (
      <div className={styles.loading}>
        Carregando missionários...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quem nós apoiamos</h1>
      {/* Grid responsivo que se adapta ao tamanho da tela */}
      <div className={styles.grid}>
        {missionaries.map((missionary) => (
          <div
            key={missionary.id}
            className={styles.cardWrapper}
          >
            {/* MissionaryCard é memoizado, evita re-renders desnecessários */}
            <MissionaryCard missionary={missionary} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MissionaryList;
