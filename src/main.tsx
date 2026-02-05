import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react"
import './index.css'
import App from './App.tsx'

// Importa a chave pública do Clerk da variável de ambiente
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Verifica se a chave está presente, lançando erro caso não esteja
if (!PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key is missing.")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ClerkProvider gerencia autenticação em toda a aplicação */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
