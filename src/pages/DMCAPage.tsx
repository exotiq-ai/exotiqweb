import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function DMCAPage() {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const originalTheme = document.documentElement.classList.contains('dark');
    document.documentElement.classList.remove('dark');
    return () => {
      if (originalTheme || theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, [theme]);

  return (
    <div className="pt-16">
      <SEOHead
        title="DMCA and Copyright Policy - Exotiq Inc."
        description="Exotiq's DMCA and copyright policy. Learn about our takedown procedures, counter-notification process, and repeat infringer policy under 17 U.S.C. Section 512."
        keywords="Exotiq DMCA, copyright policy, takedown notice, counter notification, intellectual property"
        url="https://exotiq.ai/dmca"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "DMCA Policy", url: "https://exotiq.ai/dmca" }
        ])}
      />

      <section className="legal-hero legal-hero-rose">
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="legal-title">DMCA and Copyright Policy</h1>
          <p className="legal-subtitle">Digital Millennium Copyright Act Notice and Takedown Procedures</p>
        </div>
      </section>

      <div className="legal-meta-bar">
        <div className="legal-container">
          <div className="legal-meta">
            <span><strong>Effective Date:</strong> January 1, 2026</span>
            <span><strong>Last Updated:</strong> March 2026</span>
          </div>
        </div>
      </div>

      <section className="legal-content-section">
        <div className="legal-container">
          <article className="legal-document">

            <p>Exotiq Inc. respects intellectual property rights and expects all users to do the same. This policy describes our DMCA procedures per 17 U.S.C. Section 512.</p>

            <h2>Article I: Designated Agent</h2>
            <p><strong>Name:</strong> [DMCA Designated Agent]</p>
            <p><strong>Email:</strong> <a href="mailto:dmca@exotiq.ai">dmca@exotiq.ai</a></p>
            <p><strong>Address:</strong> Exotiq Inc., 1001 S Main St #6709, Kalispell, MT 59901</p>

            <h2>Article II: Filing a Takedown Notice</h2>
            <p>Your notification must include: (a) your signature; (b) identification of the copyrighted work; (c) identification and location of the infringing material; (d) your contact information; (e) a good faith belief statement; and (f) a statement under penalty of perjury that the information is accurate.</p>
            <p>Send notices to <a href="mailto:dmca@exotiq.ai">dmca@exotiq.ai</a>.</p>

            <h2>Article III: Response to Valid Notices</h2>
            <p>Exotiq will: remove or disable the material; notify the user; inform them of counter-notification rights. Processing within five (5) business days.</p>

            <h2>Article IV: Counter-Notification</h2>
            <p>If you believe removal was in error, submit a counter-notification including: your signature; identification of removed material; a good faith statement; your contact information; and consent to jurisdiction. Content restored in 10-14 business days absent a court order.</p>

            <h2>Article V: Repeat Infringer Policy</h2>
            <p>First strike: written warning. Second strike: 30-day content upload suspension. Third strike: permanent account termination.</p>

            <h2>Article VI: Misrepresentation</h2>
            <p>Knowingly filing a materially false takedown notice or counter-notification may result in liability for damages, including costs and attorneys&apos; fees, under 17 U.S.C. Section 512(f). Exotiq reserves the right to seek damages from any party that submits a fraudulent notification.</p>

          </article>
        </div>
      </section>

      <div className="legal-footer">
        <div className="legal-footer-inner">
          <p>&copy; 2026 Exotiq Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
