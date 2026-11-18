/**
 * "How we are different" — shown on the home page.
 *
 * >>> OWNER: replace these with your own points. Add / remove items freely.
 * Each item has an English and a Kannada version. Keep titles short (2-4 words).
 * These are starter placeholders based on what is already on the site.
 */
export interface L {
  en: string;
  kn: string;
}

export const whyUsHeading: L = {
  en: "How we are different",
  kn: "ನಾವು ಹೇಗೆ ಭಿನ್ನ",
};

export const whyUsIntro: L = {
  en: "Replace this line with one sentence about what makes Narviya different.",
  kn: "ನರ್ವಿಯ ಯಾವುದರಲ್ಲಿ ಭಿನ್ನ ಎಂಬುದರ ಬಗ್ಗೆ ಒಂದು ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ.",
};

export const whyUs: { title: L; body: L }[] = [
  {
    title: { en: "Interiors + Exteriors", kn: "ಇಂಟೀರಿಯರ್ಸ್ + ಎಕ್ಸ್‌ಟೀರಿಯರ್ಸ್" },
    body: {
      en: "One team for the inside and the outside of your home. [Edit this text]",
      kn: "ನಿಮ್ಮ ಮನೆಯ ಒಳಗೂ ಹೊರಗೂ ಒಂದೇ ತಂಡ. [ಈ ಪಠ್ಯವನ್ನು ಬದಲಾಯಿಸಿ]",
    },
  },
  {
    title: { en: "Fixed-Scope Quotes", kn: "ನಿಗದಿತ ದರದ ಕೊಟೇಶನ್" },
    body: {
      en: "You know the price before work starts. [Edit this text]",
      kn: "ಕೆಲಸ ಶುರುವಾಗುವ ಮೊದಲೇ ನಿಮಗೆ ಬೆಲೆ ತಿಳಿದಿರುತ್ತದೆ. [ಈ ಪಠ್ಯವನ್ನು ಬದಲಾಯಿಸಿ]",
    },
  },
  {
    title: { en: "Point 3", kn: "ಅಂಶ 3" },
    body: {
      en: "Write your own point here.",
      kn: "ನಿಮ್ಮ ಸ್ವಂತ ಅಂಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ.",
    },
  },
  {
    title: { en: "Point 4", kn: "ಅಂಶ 4" },
    body: {
      en: "Write your own point here.",
      kn: "ನಿಮ್ಮ ಸ್ವಂತ ಅಂಶವನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ.",
    },
  },
];
