import type { Letter, Missionary, Verse as VerseType } from "../types";

const API_URL = "http://localhost:3000";

export const popularVerses: VerseType[] = [];

// Listar missionários da API
export const fetchMissionaries = async (): Promise<Missionary[]> => {
  try {
    const response = await fetch(`${API_URL}/missionaries`);
    const missionaries = await response.json();
    return missionaries;
  } catch (error) {
    console.error("Error fetching missionaries:", error);
    throw error;
  }
};

// Listar todas as cartas da API
export const fetchLetters = async (): Promise<Letter[]> => {
  try {
    const response = await fetch(`${API_URL}/letters`);
    const letters = await response.json();
    return letters;
  } catch (error) {
    console.error("Error fetching letters:", error);
    throw error;
  }
};

// Listar todos os versículos da API
export const fetchVerses = async (): Promise<VerseType[]> => {
  try {
    const response = await fetch(`${API_URL}/verses`);
    const verses = await response.json();
    return verses;
  } catch (error) {
    console.error("Error fetching verses:", error);
    throw error;
  }
};

// Salvar uma carta pela API
export const saveLetterToAPI = async (letter: Letter): Promise<Letter> => {
  try {
    const response = await fetch(`${API_URL}/letters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(letter)
    });
    const savedLetter = await response.json();
    return savedLetter;
    } 
    catch (error) {
    console.error("Erro ao salvar uma Letter via API...", error);
    throw error;
  }
};

