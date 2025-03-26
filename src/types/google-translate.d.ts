
/**
 * TypeScript declarations for Google Translate API
 */

interface Window {
  google: {
    translate: {
      TranslateElement: {
        InlineLayout: {
          HORIZONTAL: number;
          SIMPLE: number;
          VERTICAL: number;
        };
        FloatPosition: {
          TOP_LEFT: number;
          TOP_RIGHT: number;
          BOTTOM_LEFT: number;
          BOTTOM_RIGHT: number;
        };
        new (options: {
          pageLanguage: string;
          includedLanguages?: string;
          layout?: number;
          autoDisplay?: boolean;
          multilanguagePage?: boolean;
          gaTrack?: boolean;
          gaId?: string;
        }, element: string | HTMLElement): any;
      };
    };
  };
  googleTranslateElementInit?: () => void;
}
