import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./LetterForm.module.css";
import { useMissionaries } from "../../../hooks/useMissionaries";
import { useState } from "react";
import { saveLetterToAPI } from "../../../api/api";
import type { Verse } from "../../../types";

// Schema de validação usando Zod
// Define as regras de validação para cada campo do formulário
const schema = z.object({
  missionaryId: z.string().min(1, "Selecione um missionário"),
  senderName: z.string().min(1, "Digite seu nome"),
  content: z.string().min(1, "Digite sua mensagem"),
  verseId: z.string().optional(),
});

// Tipo inferido do schema para type-safety
type LetterFormData = z.infer<typeof schema>;

export function LetterForm() {
  // Hook customizado para buscar missionários
  const { missionaries } = useMissionaries();

  // Estado para controlar mensagem de sucesso
  const [showSuccess, setShowSuccess] = useState(false);

  // Integração do React Hook Form com Zod para validação
  // zodResolver conecta o schema Zod com o React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LetterFormData>({
    resolver: zodResolver(schema),
  });

  // Função executada ao submeter o formulário
  // Busca o missionário selecionado, salva a carta na API e exibe mensagem de sucesso
  const onSubmit = async (data: LetterFormData) => {
    try {
      const missionary = missionaries.find((m) => m.id === data.missionaryId);

      if (!missionary) {
        console.error("Missionário não encontrado");
        return;
      }

      // Cria objeto de versículo vazio (placeholder)
      const emptyVerse: Verse = {
        id: "1",
        reference: "Filipenses 4:13",
        text: "Tudo posso naquele que me fortalece."
      };

      // Salva a carta na API
      await saveLetterToAPI({
        missionaryId: data.missionaryId,
        content: data.content,
        senderName: data.senderName,
        verse: emptyVerse,
        date: new Date().toISOString()
      });

      // Limpa o formulário após envio bem-sucedido
      reset();

      // Exibe mensagem de sucesso temporariamente
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao enviar carta:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Mensagem de sucesso temporária */}
      {showSuccess && (
        <div className={styles.successMessage}>
          Sua carta foi enviada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off">
        {/* Campo de seleção de missionário */}
        <div className={styles.formGroup}>
          <label htmlFor="missionary-select" className={styles.label}>
            Selecione um missionário:
          </label>
          <select
            id="missionary-select"
            {...register("missionaryId")}
            className={styles.input}
            disabled={isSubmitting}
          >
            <option value="">-- Selecione um missionário --</option>
            {missionaries.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} - {m.country}
              </option>
            ))}
          </select>
          {/* Mensagem de erro do Zod */}
          {errors.missionaryId && (
            <span className={styles.error}>{errors.missionaryId.message}</span>
          )}
        </div>

        {/* Campo de nome do remetente */}
        <div className={styles.formGroup}>
          <label htmlFor="senderName">Seu nome:</label>
          <input
            id="senderName"
            {...register("senderName")}
            placeholder="Digite seu nome"
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.senderName && (
            <span className={styles.error}>{errors.senderName.message}</span>
          )}
        </div>

        {/* Campo de conteúdo da carta */}
        <div className={styles.formGroup}>
          <label htmlFor="content">Sua mensagem:</label>
          <textarea
            id="content"
            {...register("content")}
            placeholder="Escreva sua carta..."
            className={styles.textarea}
            rows={6}
            disabled={isSubmitting}
          />
          {errors.content && (
            <span className={styles.error}>{errors.content.message}</span>
          )}
        </div>

        {/* Botão de envio */}
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar carta"}
        </button>
      </form>
    </div>
  );
}
