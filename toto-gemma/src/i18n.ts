// src/i18n.ts
// Internationalization setup with i18next

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './data/translations/en.json';
import sw from './data/translations/sw.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sw: { translation: sw },
  },
  lng: 'en', // Default language as per PRD decision
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  compatibilityJSON: 'v4',
});

export default i18n;
