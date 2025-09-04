/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { generateStructuredData, createTranslationFunction, getTranslations } from "../utils/metadata";
import { useEffect, useState } from "react";

type Language = "ms" | "en";

export function StructuredDataScript() {
  const [structuredData, setStructuredData] = useState<any>(null);

  // Use default language since this component is used in layout
  const language: Language = "ms";

  useEffect(() => {
    async function loadStructuredData() {
      try {
        const translations = await getTranslations(language);
        const t = createTranslationFunction(translations);
        const data = generateStructuredData({ language, t });
        setStructuredData(data);
      } catch (error) {
        console.error("Failed to load structured data:", error);
      }
    }

    loadStructuredData();
  }, [language]);

  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
