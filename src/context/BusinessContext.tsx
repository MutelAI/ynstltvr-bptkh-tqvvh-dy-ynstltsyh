import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { BusinessInfo, WorkingHour, ServiceItem, Review, Photo, DesignTokens, BusinessJson } from '@/types';

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_DESIGN: DesignTokens = {
  hero_layout: 'centered',
  card_style: 'shadow',
  button_style: 'rounded',
  hero_pattern: 'circles',
  gallery_style: 'masonry',
  section_style: 'standard',
  animation_style: 'elegant',
};

// ─── Context type ─────────────────────────────────────────────────────────────

interface BusinessContextValue {
  business: BusinessInfo | null;
  hours: WorkingHour[];
  services: ServiceItem[];
  reviews: Review[];
  photos: Photo[];
  translations: Record<string, { he: string; en: string }>;
  design: DesignTokens;
  loaded: boolean;
  hiddenSections: string[];
  isHidden: (key: string) => boolean;
}

const BusinessContext = createContext<BusinessContextValue>({
  business: null,
  hours: [],
  services: [],
  reviews: [],
  photos: [],
  translations: {},
  design: DEFAULT_DESIGN,
  loaded: false,
  hiddenSections: [],
  isHidden: () => false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    __bizData?: Promise<BusinessJson>;
    __editToken?: string | null;
  }
}

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<BusinessContextValue, 'isHidden'>>({
    business: null,
    hours: [],
    services: [],
    reviews: [],
    photos: [],
    translations: {},
    design: DEFAULT_DESIGN,
    loaded: false,
    hiddenSections: [],
  });

  useEffect(() => {
    const promise =
      window.__bizData ?? fetch('/data/business.json?t=' + Date.now()).then((r) => r.json());

    promise.then((data: BusinessJson) => {
      setState({
        business: data.business,
        hours: data.hours ?? [],
        services: data.services ?? [],
        reviews: data.reviews ?? [],
        photos: data.photos ?? [],
        translations: data.translations ?? {},
        design: { ...DEFAULT_DESIGN, ...(data.design ?? {}) },
        loaded: true,
        hiddenSections: data.hidden_sections ?? [],
      });
    });
  }, []);

  const value: BusinessContextValue = {
    ...state,
    isHidden: (key: string) => state.hiddenSections.includes(key),
  };

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useBusiness() {
  return useContext(BusinessContext);
}
