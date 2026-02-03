import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en' | 'de' | 'zh' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  es: {
    nav: {
      icp: 'ICP',
      darkWeb: 'Dark Web',
      mobileApp: 'App Móvil',
    },
    hero: {
      title: 'X39 Dark',
      subtitle: 'Noticias reales de la Dark Web y Crypto',
    },
    icpNinjaIntegrationGuide: {
      title: 'Guía de Integración ICP Ninja',
      technicalInfo: {
        title: 'Información Técnica',
        tokenName: 'Nombre del Token',
        tokenSymbol: 'Símbolo del Token',
        tokenIcon: 'Icono del Token',
        triangleEyeSymbol: 'Símbolo del triángulo-ojo como icono oficial del Token X39 Matrix',
      },
    },
    x39TokenAnnouncement: {
      title: 'Anuncio del Token X39',
      allianceStatement: 'El Token X39 tiene alianzas con ICP y sus socios.',
      internetComputer: 'Internet Computer',
      matrixToken: 'Token Matrix',
      loading: 'Cargando...',
      platformAvailability: 'Disponible en las siguientes plataformas:',
    },
    footer: {
      contact: 'Contacto: suporte@x39.com',
      copyright: '© 2025. Construido con amor usando',
    },
  },
  en: {
    nav: {
      icp: 'ICP',
      darkWeb: 'Dark Web',
      mobileApp: 'Mobile App',
    },
    hero: {
      title: 'X39 Dark',
      subtitle: 'Real news from the Dark Web and Crypto',
    },
    icpNinjaIntegrationGuide: {
      title: 'ICP Ninja Integration Guide',
      technicalInfo: {
        title: 'Technical Information',
        tokenName: 'Token Name',
        tokenSymbol: 'Token Symbol',
        tokenIcon: 'Token Icon',
        triangleEyeSymbol: 'Triangle-eye symbol as official X39 Matrix Token icon',
      },
    },
    x39TokenAnnouncement: {
      title: 'X39 Token Announcement',
      allianceStatement: 'The X39 Token has alliances with ICP and its partners.',
      internetComputer: 'Internet Computer',
      matrixToken: 'Matrix Token',
      loading: 'Loading...',
      platformAvailability: 'Available on the following platforms:',
    },
    footer: {
      contact: 'Contact: suporte@x39.com',
      copyright: '© 2025. Built with love using',
    },
  },
  de: {
    nav: {
      icp: 'ICP',
      darkWeb: 'Dark Web',
      mobileApp: 'Mobile App',
    },
    hero: {
      title: 'X39 Dark',
      subtitle: 'Echte Nachrichten aus dem Dark Web und Krypto',
    },
    icpNinjaIntegrationGuide: {
      title: 'ICP Ninja Integrationsleitfaden',
      technicalInfo: {
        title: 'Technische Informationen',
        tokenName: 'Token-Name',
        tokenSymbol: 'Token-Symbol',
        tokenIcon: 'Token-Symbol',
        triangleEyeSymbol: 'Dreieck-Auge-Symbol als offizielles X39 Matrix Token-Symbol',
      },
    },
    x39TokenAnnouncement: {
      title: 'X39 Token-Ankündigung',
      allianceStatement: 'Der X39 Token hat Allianzen mit ICP und seinen Partnern.',
      internetComputer: 'Internet Computer',
      matrixToken: 'Matrix-Token',
      loading: 'Wird geladen...',
      platformAvailability: 'Verfügbar auf folgenden Plattformen:',
    },
    footer: {
      contact: 'Kontakt: suporte@x39.com',
      copyright: '© 2025. Mit Liebe gebaut mit',
    },
  },
  zh: {
    nav: {
      icp: 'ICP',
      darkWeb: '暗网',
      mobileApp: '移动应用',
    },
    hero: {
      title: 'X39 Dark',
      subtitle: '来自暗网和加密货币的真实新闻',
    },
    icpNinjaIntegrationGuide: {
      title: 'ICP Ninja 集成指南',
      technicalInfo: {
        title: '技术信息',
        tokenName: '令牌名称',
        tokenSymbol: '令牌符号',
        tokenIcon: '令牌图标',
        triangleEyeSymbol: '三角眼符号作为官方X39 Matrix Token图标',
      },
    },
    x39TokenAnnouncement: {
      title: 'X39令牌公告',
      allianceStatement: 'X39令牌与ICP及其合作伙伴建立了联盟。',
      internetComputer: '互联网计算机',
      matrixToken: 'Matrix令牌',
      loading: '加载中...',
      platformAvailability: '在以下平台上可用：',
    },
    footer: {
      contact: '联系方式：suporte@x39.com',
      copyright: '© 2025. 用爱构建，使用',
    },
  },
  ja: {
    nav: {
      icp: 'ICP',
      darkWeb: 'ダークウェブ',
      mobileApp: 'モバイルアプリ',
    },
    hero: {
      title: 'X39 Dark',
      subtitle: 'ダークウェブと暗号通貨からの本物のニュース',
    },
    icpNinjaIntegrationGuide: {
      title: 'ICP Ninja統合ガイド',
      technicalInfo: {
        title: '技術情報',
        tokenName: 'トークン名',
        tokenSymbol: 'トークンシンボル',
        tokenIcon: 'トークンアイコン',
        triangleEyeSymbol: '公式X39 Matrix Tokenアイコンとしてのトライアングルアイシンボル',
      },
    },
    x39TokenAnnouncement: {
      title: 'X39トークン発表',
      allianceStatement: 'X39トークンはICPとそのパートナーと提携しています。',
      internetComputer: 'インターネットコンピュータ',
      matrixToken: 'Matrixトークン',
      loading: '読み込み中...',
      platformAvailability: '以下のプラットフォームで利用可能：',
    },
    footer: {
      contact: '連絡先：suporte@x39.com',
      copyright: '© 2025. 愛を込めて構築、使用',
    },
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
