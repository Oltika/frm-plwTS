
// Collection of Spanish words with their English translations
export interface WordPair {
  id: number;
  spanish: string;
  english: string;
  partOfSpeech?: string;
}

export const spanishWords: WordPair[] = [
  { id: 1, spanish: "hola", english: "hello", partOfSpeech: "greeting" },
  { id: 2, spanish: "adiós", english: "goodbye", partOfSpeech: "greeting" },
  { id: 3, spanish: "gracias", english: "thank you", partOfSpeech: "expression" },
  { id: 4, spanish: "por favor", english: "please", partOfSpeech: "expression" },
  { id: 5, spanish: "casa", english: "house", partOfSpeech: "noun" },
  { id: 6, spanish: "perro", english: "dog", partOfSpeech: "noun" },
  { id: 7, spanish: "gato", english: "cat", partOfSpeech: "noun" },
  { id: 8, spanish: "comer", english: "to eat", partOfSpeech: "verb" },
  { id: 9, spanish: "beber", english: "to drink", partOfSpeech: "verb" },
  { id: 10, spanish: "hablar", english: "to speak", partOfSpeech: "verb" },
  { id: 11, spanish: "rojo", english: "red", partOfSpeech: "adjective" },
  { id: 12, spanish: "azul", english: "blue", partOfSpeech: "adjective" },
  { id: 13, spanish: "grande", english: "big", partOfSpeech: "adjective" },
  { id: 14, spanish: "pequeño", english: "small", partOfSpeech: "adjective" },
  { id: 15, spanish: "bueno", english: "good", partOfSpeech: "adjective" }
];
