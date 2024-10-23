import React, { lazy } from "react";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import Cache from "i18next-localstorage-cache";
import postProcessor from "i18next-sprintf-postprocessor";
import LanguageDetector from "i18next-browser-languagedetector";

import enUS from "../../translation/en-US/translation.json";
import trTR from "../../translation/tr-TR/translation.json";

i18next
	.use(Backend)
	.use(initReactI18next)
	.use(Cache)
	.use(LanguageDetector)
	.use(postProcessor)
	.init({
		fallbackLng: "en-US",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				translation: enUS,
			},
			tr: {
				translation: trTR,
			},
		},
	});

export default i18next;
