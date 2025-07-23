// global.d.ts
declare module '@env' {
    export const OPENAI_API_KEY: string;
    // Eğer gelecekte başka .env değişkenleriniz olursa,
    // onları da buraya eklemeniz gerekecek.
    // Örnek: export const ANOTHER_VAR: string;
  }