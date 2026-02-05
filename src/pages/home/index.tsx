import React, { Suspense, useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { Mail, Heart } from "lucide-react";
import { MissionaryListSkeleton } from "../../components/MissionaryListSkeleton";
import { LetterListSkeleton } from "../../components/LetterListSkeleton";
import CreateLetterModal from "../../components/CreateLetterModal";
import styles from "../../App.module.css";

// Lazy Loading dos componentes principais
const LetterList = React.lazy(() => import('../../components/LetterList'));
const MissionaryList = React.lazy(() => import('../../components/MissionaryList'));

// HomePage - Página protegida que requer autenticação
// Exibe a lista de missionários, cartas e permite enviar novas cartas
export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header com logo, botão de enviar carta e botão de usuário do Clerk */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Mail width={30} height={30} />
          <span>Faith Letters</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            className={styles.sendButton}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Enviar carta
          </button>
          {/* UserButton do Clerk permite logout e gerenciamento de perfil */}
          <UserButton afterSignOutUrl="/open" />
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <section className={styles.missionariesSection}>
          {/* Suspense com Skeleton para MissionaryList */}
          <Suspense fallback={<MissionaryListSkeleton />}>
            <MissionaryList />
          </Suspense>

          {/* Suspense com Skeleton para LetterList */}
          <Suspense fallback={<LetterListSkeleton />}>
            <LetterList />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
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

export default HomePage;
