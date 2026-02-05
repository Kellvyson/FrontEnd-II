import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Mail, Heart, Globe, Send } from "lucide-react";
import styles from "./open.module.css";

// OpenPage - Página pública acessível sem autenticação
// Serve como landing page e apresenta o propósito da aplicação
export function OpenPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoSection}>
            <Mail width={60} height={60} className={styles.logoIcon} />
            <h1 className={styles.title}>Faith Letters</h1>
          </div>
          <p className={styles.subtitle}>
            Envie palavras de encorajamento para missionários ao redor do mundo
          </p>
          <div className={styles.buttonGroup}>
            <SignInButton mode="modal">
              <button className={styles.primaryButton}>
                Entrar
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={styles.secondaryButton}>
                Criar Conta
              </button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <Globe className={styles.featureIcon} />
          <h3>Conexão Global</h3>
          <p>Conecte-se com missionários em diferentes países e culturas</p>
        </div>
        <div className={styles.feature}>
          <Send className={styles.featureIcon} />
          <h3>Envie Encorajamento</h3>
          <p>Escreva cartas que inspiram e fortalecem quem está no campo</p>
        </div>
        <div className={styles.feature}>
          <Heart className={styles.featureIcon} />
          <h3>Faça a Diferença</h3>
          <p>Suas palavras podem transformar o dia de um missionário</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Faith Letters - Apoiando missionários com palavras de encorajamento</p>
        <p className={styles.footerSubtext}>
          Feito com <Heart className={styles.heartIconSmall} /> para aqueles que espalham o evangelho pelo mundo
        </p>
      </footer>
    </div>
  );
}

export default OpenPage;
