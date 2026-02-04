import { createContext, useContext, useEffect, useState } from "react";
import type { Missionary, Letter, Verse } from "../types";
import { useMissionaries, useLetters, useVerses } from "../hooks";

interface AppContextType {
  // Estados de carregamento
  loading: boolean;

  // Estados de dados
  missionaries: Missionary[];
  letters: Letter[];
  verses: Verse[];

  // Estados de seleção
  selectedMissionary: Missionary | null;
  selectedLetter: Letter | null;

  // Estados da interface
  isWritingLetter: boolean;
  showLetterModal: boolean;

  // Ações
  setSelectedMissionary: (missionary: Missionary | null) => void;
  setSelectedLetter: (letter: Letter | null) => void;
  setIsWritingLetter: (isWriting: boolean) => void;
  setShowLetterModal: (show: boolean) => void;

  // Ações de dados
  refetchMissionaries: () => void;
  refetchLetters: () => void;
  refetchVerses: () => void;
}

const AppContext = createContext<AppContextType>({
  loading: false,
  missionaries: [],
  letters: [],
  verses: [],
  selectedMissionary: null,
  selectedLetter: null,
  isWritingLetter: false,
  showLetterModal: false,
  setSelectedMissionary: () => { },
  setSelectedLetter: () => { },
  setIsWritingLetter: () => { },
  setShowLetterModal: () => { },
  refetchMissionaries: () => { },
  refetchLetters: () => { },
  refetchVerses: () => { },
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Usa hooks customizados para gerenciamento de dados
  const { missionaries, loading: missionariesLoading, refetch: refetchMissionaries } = useMissionaries();
  const { letters, loading: lettersLoading, refetch: refetchLetters } = useLetters();
  const { verses, loading: versesLoading, refetch: refetchVerses } = useVerses();

  // Gerenciamento de estado da interface
  const [selectedMissionary, setSelectedMissionary] = useState<Missionary | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isWritingLetter, setIsWritingLetter] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);

  // Estado de carregamento combinado
  const loading = missionariesLoading || lettersLoading || versesLoading;

  const contextValue: AppContextType = {
    loading,
    missionaries,
    letters,
    verses,
    selectedMissionary,
    selectedLetter,
    isWritingLetter,
    showLetterModal,
    setSelectedMissionary,
    setSelectedLetter,
    setIsWritingLetter,
    setShowLetterModal,
    refetchMissionaries,
    refetchLetters,
    refetchVerses,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppContextProvider');
  }
  return context;
};

export default AppContext;