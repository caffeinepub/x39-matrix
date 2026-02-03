import React from 'react';
import { Smartphone, Download, Shield, Wallet, Gift, ExternalLink } from 'lucide-react';
import { getCurrentOrigin } from '../utils/urls';
import { getAndroidUrl, isApkFallbackEnabled } from '../config/distribution';

export function AndroidMobileAppSection() {
  const androidUrl = getAndroidUrl();
  const showApkFallback = isApkFallbackEnabled();
  const apkDownloadUrl = `${getCurrentOrigin()}/downloads/x39-matrix-mobile.apk`;

  return (
    <section className="android-mobile-section py-16 px-4 bg-black/60">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-black/80 to-red-900/20 border-2 border-red-500/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          {/* Header with Triangle Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 -m-4 bg-red-500/20 rounded-full blur-2xl animate-glow-pulse" />
              <img 
                src="/assets/generated/triangle-eye-symbol-transparent.dim_128x128.png" 
                alt="X39 Matrix Mobile" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain animate-triangle-pulse relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(0, 100, 255, 0.5))'
                }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 neon-text-red font-orbitron text-center mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.6)',
              }}>
              X39 Matrix Mobile
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-montserrat text-center">
              Dedicated Android Token Application
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Token Focus */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Exclusive Token Focus
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Simplified interface focused solely on X39 Matrix token information and airdrop functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Airdrop Claim */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Gift className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Airdrop Claim
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Complete claim system for up to 200,000 tokens with secure validation and processing.
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Integration */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Wallet className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Wallet Integration
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Compatible with ICP, Plug, Stoic, Bitfinity, Infinity, and other major wallets.
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-black/40 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-2 font-orbitron">
                    Enhanced Security
                  </h3>
                  <p className="text-gray-300 font-montserrat text-sm">
                    Secure wallet address validation with anti-fraud protection and IP-based limits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* App Details */}
          <div className="bg-black/60 border border-red-500/40 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-red-500 mb-4 font-orbitron neon-text-red">
              Application Features
            </h3>
            <ul className="space-y-3 text-gray-300 font-montserrat">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Cyberpunk Aesthetic:</strong> Matrix black-red-neon design identical to website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Triangle-Eye Logo:</strong> Official symbol as central brand element</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">English Language:</strong> All interface elements in English</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Wallet Selector:</strong> Cyberpunk-themed modal for selection and address entry</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Progress Tracking:</strong> Visual indicators for claim status and confirmation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">▸</span>
                <span><strong className="text-red-400">Responsive Design:</strong> Adapts to different Android screen sizes</span>
              </li>
            </ul>
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-center gap-4">
            {androidUrl ? (
              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-red-glow transition-all duration-300 border-2 border-red-500 hover:border-red-400 animate-glow-pulse"
                style={{
                  textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                }}
              >
                <ExternalLink className="w-6 h-6" />
                <span className="font-orbitron uppercase tracking-wider">
                  Get on Play Store
                </span>
              </a>
            ) : showApkFallback ? (
              <a
                href={apkDownloadUrl}
                download="x39-matrix-mobile.apk"
                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-red-glow transition-all duration-300 border-2 border-red-500 hover:border-red-400 animate-glow-pulse"
                style={{
                  textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                }}
              >
                <Download className="w-6 h-6" />
                <span className="font-orbitron uppercase tracking-wider">
                  Download APK Now
                </span>
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-slate-600 text-slate-400 font-bold text-lg rounded-xl shadow-2xl border-2 border-slate-600 cursor-not-allowed"
              >
                <Smartphone className="w-6 h-6" />
                <span className="font-orbitron uppercase tracking-wider">
                  Coming Soon
                </span>
              </button>
            )}
            
            <p className="text-sm text-gray-400 font-montserrat text-center max-w-md">
              {androidUrl 
                ? 'Download from Google Play Store. Compatible with Android 8.0 and above.'
                : showApkFallback
                ? 'Direct APK download. Compatible with Android 8.0 and above. Size: ~15 MB'
                : 'Android app will be available soon on Google Play Store.'
              }
            </p>
          </div>

          {/* Installation Instructions (only for APK) */}
          {showApkFallback && !androidUrl && (
            <div className="mt-8 bg-black/40 border border-red-500/30 rounded-lg p-6">
              <h4 className="text-xl font-bold text-red-500 mb-4 font-orbitron">
                Installation Instructions
              </h4>
              <ol className="space-y-2 text-gray-300 font-montserrat text-sm">
                <li><strong className="text-red-400">1.</strong> Download the APK file using the button above</li>
                <li><strong className="text-red-400">2.</strong> Enable "Install from unknown sources" in Android settings</li>
                <li><strong className="text-red-400">3.</strong> Open the downloaded APK file</li>
                <li><strong className="text-red-400">4.</strong> Follow on-screen instructions to complete installation</li>
                <li><strong className="text-red-400">5.</strong> Open X39 Matrix Mobile and connect your wallet to claim tokens</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
