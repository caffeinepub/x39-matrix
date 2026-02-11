import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en' | 'ja' | 'zh' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    'hero.title': 'X39 Matrix',
    'hero.subtitle': 'El Protocolo Matrix del Futuro',
    'hero.description': 'Bienvenido a X39 Matrix - La nueva generación de tecnología descentralizada',
    'nav.home': 'Inicio',
    'nav.icp': 'ICP',
    'nav.darkweb': 'Dark Web',
    'nav.graphics': 'Gráficos',
    'nav.portfolio': 'Portfolio',
    'footer.builtWith': 'Construido con',
    'footer.love': 'amor',
    'footer.using': 'usando',
    'diagnostics.title': 'Global Availability / Domain Status',
    'diagnostics.overview': 'Overview',
    'diagnostics.domainDns': 'Domain & DNS Verification',
    'diagnostics.runDiagnostics': 'Run Diagnostics',
    'diagnostics.copyReport': 'Copy Report',
    'diagnostics.copied': 'Copied!',
    'diagnostics.close': 'Close',
    'diagnostics.cutoverStatus': 'Cutover Status',
    'diagnostics.currentOrigin': 'Current Origin',
    'diagnostics.domainConfig': 'Domain Configuration',
    'diagnostics.backendHealth': 'Backend Health',
    'diagnostics.detailedChecks': 'Detailed Verification Checks',
    'diagnostics.operatorGuidance': 'Operator Guidance',
    'diagnostics.documentation': 'Documentation',
    'diagnostics.copyCutoverReport': 'Copy Cutover Report',
  },
  en: {
    'hero.title': 'X39 Matrix',
    'hero.subtitle': 'The Matrix Protocol of the Future',
    'hero.description': 'Welcome to X39 Matrix - The next generation of decentralized technology',
    'nav.home': 'Home',
    'nav.icp': 'ICP',
    'nav.darkweb': 'Dark Web',
    'nav.graphics': 'Graphics',
    'nav.portfolio': 'Portfolio',
    'footer.builtWith': 'Built with',
    'footer.love': 'love',
    'footer.using': 'using',
    'diagnostics.title': 'Global Availability / Domain Status',
    'diagnostics.overview': 'Overview',
    'diagnostics.domainDns': 'Domain & DNS Verification',
    'diagnostics.runDiagnostics': 'Run Diagnostics',
    'diagnostics.copyReport': 'Copy Report',
    'diagnostics.copied': 'Copied!',
    'diagnostics.close': 'Close',
    'diagnostics.cutoverStatus': 'Cutover Status',
    'diagnostics.currentOrigin': 'Current Origin',
    'diagnostics.domainConfig': 'Domain Configuration',
    'diagnostics.backendHealth': 'Backend Health',
    'diagnostics.detailedChecks': 'Detailed Verification Checks',
    'diagnostics.operatorGuidance': 'Operator Guidance',
    'diagnostics.documentation': 'Documentation',
    'diagnostics.copyCutoverReport': 'Copy Cutover Report',
  },
  ja: {
    'hero.title': 'X39 Matrix',
    'hero.subtitle': '未来のマトリックスプロトコル',
    'hero.description': 'X39 Matrixへようこそ - 次世代の分散型技術',
    'nav.home': 'ホーム',
    'nav.icp': 'ICP',
    'nav.darkweb': 'ダークウェブ',
    'nav.graphics': 'グラフィックス',
    'nav.portfolio': 'ポートフォリオ',
    'footer.builtWith': 'Built with',
    'footer.love': 'love',
    'footer.using': 'using',
    'diagnostics.title': 'Global Availability / Domain Status',
    'diagnostics.overview': 'Overview',
    'diagnostics.domainDns': 'Domain & DNS Verification',
    'diagnostics.runDiagnostics': 'Run Diagnostics',
    'diagnostics.copyReport': 'Copy Report',
    'diagnostics.copied': 'Copied!',
    'diagnostics.close': 'Close',
    'diagnostics.cutoverStatus': 'Cutover Status',
    'diagnostics.currentOrigin': 'Current Origin',
    'diagnostics.domainConfig': 'Domain Configuration',
    'diagnostics.backendHealth': 'Backend Health',
    'diagnostics.detailedChecks': 'Detailed Verification Checks',
    'diagnostics.operatorGuidance': 'Operator Guidance',
    'diagnostics.documentation': 'Documentation',
    'diagnostics.copyCutoverReport': 'Copy Cutover Report',
  },
  zh: {
    'hero.title': 'X39 Matrix',
    'hero.subtitle': '未来的矩阵协议',
    'hero.description': '欢迎来到X39 Matrix - 下一代去中心化技术',
    'nav.home': '首页',
    'nav.icp': 'ICP',
    'nav.darkweb': '暗网',
    'nav.graphics': '图形',
    'nav.portfolio': '投资组合',
    'footer.builtWith': 'Built with',
    'footer.love': 'love',
    'footer.using': 'using',
    'diagnostics.title': 'Global Availability / Domain Status',
    'diagnostics.overview': 'Overview',
    'diagnostics.domainDns': 'Domain & DNS Verification',
    'diagnostics.runDiagnostics': 'Run Diagnostics',
    'diagnostics.copyReport': 'Copy Report',
    'diagnostics.copied': 'Copied!',
    'diagnostics.close': 'Close',
    'diagnostics.cutoverStatus': 'Cutover Status',
    'diagnostics.currentOrigin': 'Current Origin',
    'diagnostics.domainConfig': 'Domain Configuration',
    'diagnostics.backendHealth': 'Backend Health',
    'diagnostics.detailedChecks': 'Detailed Verification Checks',
    'diagnostics.operatorGuidance': 'Operator Guidance',
    'diagnostics.documentation': 'Documentation',
    'diagnostics.copyCutoverReport': 'Copy Cutover Report',
  },
  ko: {
    'hero.title': 'X39 Matrix',
    'hero.subtitle': '미래의 매트릭스 프로토콜',
    'hero.description': 'X39 Matrix에 오신 것을 환영합니다 - 차세대 탈중앙화 기술',
    'nav.home': '홈',
    'nav.icp': 'ICP',
    'nav.darkweb': '다크웹',
    'nav.graphics': '그래픽',
    'nav.portfolio': '포트폴리오',
    'footer.builtWith': 'Built with',
    'footer.love': 'love',
    'footer.using': 'using',
    'diagnostics.title': 'Global Availability / Domain Status',
    'diagnostics.overview': 'Overview',
    'diagnostics.domainDns': 'Domain & DNS Verification',
    'diagnostics.runDiagnostics': 'Run Diagnostics',
    'diagnostics.copyReport': 'Copy Report',
    'diagnostics.copied': 'Copied!',
    'diagnostics.close': 'Close',
    'diagnostics.cutoverStatus': 'Cutover Status',
    'diagnostics.currentOrigin': 'Current Origin',
    'diagnostics.domainConfig': 'Domain Configuration',
    'diagnostics.backendHealth': 'Backend Health',
    'diagnostics.detailedChecks': 'Detailed Verification Checks',
    'diagnostics.operatorGuidance': 'Operator Guidance',
    'diagnostics.documentation': 'Documentation',
    'diagnostics.copyCutoverReport': 'Copy Cutover Report',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
