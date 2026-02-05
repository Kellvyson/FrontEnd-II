import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import HomePage from "./pages/home";
import OpenPage from "./pages/open";

// Componente principal da aplicação
// Gerencia o roteamento e controle de acesso baseado em autenticação
function App() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz (/) - Protegida, requer autenticação */}
        <Route
          path="/"
          element={
            <>
              {/* SignedIn: renderiza conteúdo apenas para usuários autenticados */}
              <SignedIn>
                <HomePage />
              </SignedIn>
              {/* SignedOut: redireciona usuários não autenticados para login */}
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Rota /open - Pública, acessível sem autenticação */}
        <Route path="/open" element={<OpenPage />} />

        {/* Rota catch-all (*) - Redireciona para login se não autenticado */}
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <HomePage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
