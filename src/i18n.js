import i18n from "i18next";
import XHR from 'i18next-xhr-backend';
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationRW from './locales/rw/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  rw: {
    translation: translationRW
  }
};

i18n
  .use(XHR)
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    keySeparator: false, 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;