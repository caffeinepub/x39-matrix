import React from 'react';
import { usePublicationState } from '../../hooks/publication/usePublicationState';
import { FileText, Calendar, Loader2 } from 'lucide-react';

/**
 * Legal Disclaimer Section Component
 * 
 * Displays the approved legal disclaimer with publication-state-gated visibility.
 * When publication state is false (pre-launch): Shows "not yet effective" state
 * When publication state is true (published): Shows full published disclaimer
 * When publication state is loading/unknown: Shows loading indicator
 */
export function LegalDisclaimerSection() {
  const { data: isPublished, isReady, isLoading } = usePublicationState();

  // Show loading state while fetching publication state
  // Treat as "unknown" until definitively resolved
  if (!isReady || isLoading) {
    return (
      <section id="legal-disclaimer" className="legal-disclaimer-section py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isPublished) {
    // Pre-launch state: clearly indicate disclaimer is not yet effective
    return (
      <section id="legal-disclaimer" className="legal-disclaimer-section py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron neon-text-red text-center">
              Legal Disclaimer
            </h2>
            <div className="text-center">
              <p className="text-xl text-gray-300 mb-4 font-montserrat">
                The official legal disclaimer will be published when the platform goes live.
              </p>
              <p className="text-2xl font-bold text-red-500 neon-text-red font-orbitron mb-4">
                Coming Soon
              </p>
              <p className="text-gray-400 font-montserrat">
                This document will become effective on the mainnet launch date.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Post-launch state: show full published disclaimer
  return (
    <section id="legal-disclaimer" className="legal-disclaimer-section py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/70 border-2 border-red-500/50 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron neon-text-red text-center">
            Legal Disclaimer
          </h2>
          <p className="text-center text-gray-400 mb-8 font-montserrat">
            <strong>Effective Date: March 15, 2026</strong>
          </p>

          <div className="text-gray-300 space-y-6 font-montserrat text-base leading-relaxed">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Important Notice
              </h3>
              <p>
                This legal disclaimer applies to all users accessing and using the X39 Matrix platform ("Platform"), 
                including the website at x39matrix.org and any associated services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                No Investment Advice
              </h3>
              <p>
                The information provided on this Platform is for informational purposes only and does not constitute 
                financial, investment, legal, or tax advice. You should not construe any information or materials on 
                this Platform as such advice. Always consult with qualified professionals before making any investment 
                decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Risk Disclosure
              </h3>
              <p>
                Cryptocurrency and blockchain technologies involve substantial risk. The value of digital assets can 
                be extremely volatile and may result in significant losses. You should carefully consider whether 
                trading or holding digital assets is suitable for you in light of your financial condition and risk 
                tolerance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                No Guarantees
              </h3>
              <p>
                X39 Matrix makes no representations or warranties regarding the accuracy, completeness, or timeliness 
                of any information on this Platform. We do not guarantee any specific outcomes or returns from using 
                our services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Regulatory Compliance
              </h3>
              <p>
                Users are responsible for complying with all applicable laws and regulations in their jurisdiction. 
                Some jurisdictions may restrict or prohibit the use of cryptocurrency platforms. It is your 
                responsibility to ensure your use of this Platform complies with local laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Third-Party Services
              </h3>
              <p>
                This Platform may integrate with or link to third-party services, including but not limited to 
                cryptocurrency exchanges and wallet providers. X39 Matrix is not responsible for the content, 
                policies, or practices of any third-party services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Limitation of Liability
              </h3>
              <p>
                To the maximum extent permitted by law, X39 Matrix and its affiliates shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible 
                losses resulting from your use of the Platform.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Internet Computer Protocol
              </h3>
              <p>
                This Platform operates on the Internet Computer Protocol (ICP). While ICP provides enhanced security 
                and decentralization, users should understand the inherent risks associated with blockchain technology, 
                including but not limited to smart contract vulnerabilities, network congestion, and protocol changes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                User Responsibilities
              </h3>
              <p className="mb-2">By using this Platform, you agree to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Maintain the security of your authentication credentials</li>
                <li>Not engage in any fraudulent, abusive, or illegal activities</li>
                <li>Not attempt to manipulate or exploit the Platform</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Changes to Disclaimer
              </h3>
              <p>
                X39 Matrix reserves the right to modify this disclaimer at any time. Continued use of the Platform 
                after changes constitutes acceptance of the modified terms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-500 mb-3 font-orbitron">
                Contact
              </h3>
              <p>
                For questions regarding this disclaimer, please contact:{' '}
                <a href="mailto:suporte@x39.com" className="text-red-500 hover:text-red-400 transition-colors">
                  suporte@x39.com
                </a>
              </p>
            </div>

            <div className="pt-6 border-t border-red-500/30 text-center">
              <p className="text-sm text-gray-400">
                <strong>Last Updated: March 15, 2026</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
