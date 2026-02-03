import React from 'react';
import { Smartphone, Apple, Globe, ExternalLink } from 'lucide-react';
import { getAndroidUrl, getIosUrl, getWebAppUrl, isApkFallbackEnabled } from '../config/distribution';
import { getCurrentOrigin } from '../utils/urls';

export function CrossPlatformDistributionSection() {
  const androidUrl = getAndroidUrl();
  const iosUrl = getIosUrl();
  const webAppUrl = getWebAppUrl();
  const showApkFallback = isApkFallbackEnabled();
  const apkDownloadUrl = `${getCurrentOrigin()}/downloads/x39-matrix-mobile.apk`;

  return (
    <section className="cross-platform-section py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800/80 border-2 border-blue-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 font-orbitron"
              style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.6)',
              }}>
              X39Matrix Staking Platform
            </h2>
            <p className="text-xl text-slate-300 font-montserrat">
              Access X39Matrix on your preferred platform
            </p>
          </div>

          {/* Platform Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Android Card */}
            <div className="bg-slate-700/50 border border-blue-600/50 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Smartphone className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-orbitron">
                  Android
                </h3>
                <p className="text-slate-300 font-montserrat text-sm">
                  Native Android app with full staking features
                </p>
                
                {androidUrl ? (
                  <a
                    href={androidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Play Store</span>
                  </a>
                ) : (
                  <>
                    <button
                      disabled
                      className="w-full bg-slate-600 text-slate-400 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                    >
                      Coming soon
                    </button>
                    {showApkFallback && (
                      <a
                        href={apkDownloadUrl}
                        download="x39-matrix-mobile.apk"
                        className="w-full text-sm text-blue-400 hover:text-blue-300 underline font-montserrat"
                      >
                        Download APK (alternative)
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* iOS Card */}
            <div className="bg-slate-700/50 border border-blue-600/50 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Apple className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-orbitron">
                  iOS
                </h3>
                <p className="text-slate-300 font-montserrat text-sm">
                  Native iOS app with full staking features
                </p>
                
                {iosUrl ? (
                  <a
                    href={iosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>App Store</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-600 text-slate-400 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                  >
                    Coming soon
                  </button>
                )}
              </div>
            </div>

            {/* Web Card */}
            <div className="bg-slate-700/50 border border-blue-600/50 rounded-xl p-6 hover:border-blue-500 transition-all">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Globe className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-orbitron">
                  Web App
                </h3>
                <p className="text-slate-300 font-montserrat text-sm">
                  Access X39Matrix directly from your browser
                </p>
                
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Open Web App</span>
                </a>
                
                <a
                  href="#portfolio-section"
                  className="w-full text-sm text-blue-400 hover:text-blue-300 underline font-montserrat"
                >
                  Go to Staking →
                </a>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 text-center">
            <p className="text-slate-300 font-montserrat">
              All platforms support <strong className="text-blue-400">Internet Identity</strong> authentication and full staking functionality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
