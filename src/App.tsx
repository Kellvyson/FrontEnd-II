import React, { Suspense, useState } from "react";
import { Mail, Heart } from "lucide-react";
import { MissionaryListSkeleton } from "./components/MissionaryListSkeleton";
import { LetterListSkeleton } from "./components/LetterListSkeleton";
import CreateLetterModal from "./components/CreateLetterModal";
import styles from "./App.module.css";

// Lazy Loading dos componentes principais
// Isso reduz o tamanho do bundle inicial, carregando os componentes apenas quando necessários
// Melhora significativamente o tempo de carregamento inicial da aplicação
const LetterList = React.lazy(() => import('./components/LetterList'));
const MissionaryList = React.lazy(() => import('./components/MissionaryList'));

function App() {
  // Estado para controlar abertura/fechamento do modal
  // Smart Component gerencia este estado e passa como props para o Dumb Component
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header com logo e botão de ação */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Mail width={30} height={30} />
          <span>Faith Letters</span>
        </div>
        <button
          className={styles.sendButton}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Enviar carta
        </button>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <section className={styles.missionariesSection}>
          {/* Suspense com Skeleton para MissionaryList
              Enquanto o componente carrega, exibe o skeleton animado
              Melhora a experiência do usuário evitando "tela branca" */}
          <Suspense fallback={<MissionaryListSkeleton />}>
            <MissionaryList />
          </Suspense>

          {/* Suspense com Skeleton para LetterList
              Cada componente tem seu próprio boundary de Suspense
              Permite carregamento independente e melhor controle de loading */}
          <Suspense fallback={<LetterListSkeleton />}>
            <LetterList />
          </Suspense>
        </section>
      </main>

      {/* Footer com informações do projeto */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h1 className={styles.footerTitle}>
            Faith Letters - Apoiando missionários com palavras de encorajamento
          </h1>
          <p className={styles.footerDescription}>
            Feito com <Heart className={styles.heartIcon} /> para aqueles que espalham o evangelho pelo mundo
          </p>
        </div>
      </footer>

      {/* Modal de criação de carta */}
      <CreateLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;
