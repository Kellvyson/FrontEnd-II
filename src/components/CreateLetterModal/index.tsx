import { Modal } from "../Modal";
import { LetterForm } from "./LetterForm";

// Smart Component: CreateLetterModal
// Gerencia a lógica de estado e controle do modal
// Utiliza o componente Modal (Dumb Component) para apresentação
export function CreateLetterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
      title="Criar uma Carta"
    >
      <LetterForm />
    </Modal>
  );
}

export default CreateLetterModal;
