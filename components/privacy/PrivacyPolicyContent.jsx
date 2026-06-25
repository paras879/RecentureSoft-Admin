"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Download, Check, Info, User, Cookie, Link as LinkIcon,
  Share2, Shield, Clock, Gavel, FileText, Phone, FileQuestion, ArrowUp
} from 'lucide-react';

import TableOfContents from './TableOfContents';
import PrivacySection from './PrivacySection';
import QuickSummary from './QuickSummary';
import { DataFlowIllustration, SecurityShieldIllustration } from './Illustrations';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction', icon: Info },
  { id: 'user-information', title: '2. User Information', icon: User },
  { id: 'cookies', title: '3. Cookies Policy', icon: Cookie },
  { id: 'third-party', title: '4. Third-Party Links', icon: LinkIcon },
  { id: 'information-sharing', title: '5. Information Sharing', icon: Share2 },
  { id: 'information-security', title: '6. Information Security', icon: Shield },
  { id: 'data-retention', title: '7. Data Retention', icon: Clock },
  { id: 'user-rights', title: '8. User Rights', icon: Gavel },
  { id: 'grievance', title: '9. Grievance Redressal', icon: FileText },
  { id: 'contact', title: '10. Contact Information', icon: Phone },
];

export default function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Back to top visibility
          setShowBackToTop(window.scrollY > 500);

          // Scrollspy logic
          const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
          const currentPos = window.scrollY + 150;

          let current = SECTIONS[0].id;
          for (let i = 0; i < sectionElements.length; i++) {
            const el = sectionElements[i];
            if (el && el.offsetTop <= currentPos) {
              current = SECTIONS[i].id;
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = () => {
    // Placeholder function
    alert("Downloading Privacy Policy as PDF...");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Header Area */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Last Updated: June 17, 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We believe in full transparency. Learn exactly how we collect, use, and protect your personal information in our simple, easy-to-read policy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </motion.div>
        </div>
      </div>

      <QuickSummary />

      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 order-2 lg:order-1">
          <TableOfContents sections={SECTIONS} activeSection={activeSection} />
        </div>

        {/* Main Content */}
        <div className="flex-1 order-1 lg:order-2">

          <div className={!searchQuery || 'Introduction'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="introduction" title="1. Introduction" icon={SECTIONS[0].icon}>
              <p className="mb-4">Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website and use our software services. Please read this privacy policy carefully.</p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 flex gap-3 my-6">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-200 m-0">By using our services, you consent to the data practices described in this statement. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
              </div>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'User Information data collect'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="user-information" title="2. User Information" icon={SECTIONS[1].icon}>
              <p className="mb-4">We collect information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products, or otherwise contact us.</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and physical address.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, and operating system.</li>
              </ul>
              <div className="my-8">
                <h4 className="text-base font-semibold mb-4 text-zinc-900 dark:text-white">Data Flow Overview</h4>
                <DataFlowIllustration />
              </div>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Cookies tracking'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="cookies" title="3. Cookies Policy" icon={SECTIONS[2].icon}>
              <p className="mb-4">We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience.</p>
              <p>Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Third-Party Links'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="third-party" title="4. Third-Party Links" icon={SECTIONS[3].icon}>
              <p className="mb-4">The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us.</p>
              <p>Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.</p>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Information Sharing vendors'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="information-sharing" title="5. Information Sharing" icon={SECTIONS[4].icon}>
              <p className="mb-4">We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Vendors & Consultants:</strong> Third-party vendors who perform services for us.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger or sale of company assets.</li>
              </ul>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Information Security protect'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="information-security" title="6. Information Security" icon={SECTIONS[5].icon}>
              <p className="mb-6">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
              <SecurityShieldIllustration />
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Data Retention keep'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="data-retention" title="7. Data Retention" icon={SECTIONS[6].icon}>
              <p className="mb-4">We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law.</p>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'User Rights delete update'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="user-rights" title="8. User Rights" icon={SECTIONS[7].icon}>
              <p className="mb-4">Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.</p>
              <p>To request to review, update, or delete your personal information, please submit a request form through our contact page.</p>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Grievance Redressal complaint questions'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="grievance" title="9. Grievance Redressal" icon={SECTIONS[8].icon}>
              <p className="mb-4">If you have any questions or concerns about our privacy practices or your data, you have the right to file a grievance with our designated Data Protection Officer.</p>
              <p>We take all grievances seriously and aim to resolve them within 30 business days.</p>
            </PrivacySection>
          </div>

          <div className={!searchQuery || 'Contact Information email address'.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'hidden'}>
            <PrivacySection id="contact" title="10. Contact Information" icon={SECTIONS[9].icon}>
              <p className="mb-4">If you have questions or comments about this notice, you may email us or by post to:</p>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                <p className="font-semibold text-zinc-900 dark:text-white mb-2">Software Dev Company Inc.</p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-1">123 Innovation Drive, Tech Park</p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">San Francisco, CA 94105</p>
                <a href="mailto:privacy@company.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">privacy@company.com</a>
              </div>
            </PrivacySection>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 mb-12">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <FileQuestion className="w-6 h-6 text-blue-500" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Can I opt out of data collection?</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Yes, you can manage your cookie preferences and opt out of certain tracking through your browser settings or our dedicated cookie management tool.</p>
              </div>
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">Are you GDPR compliant?</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Yes, we strictly adhere to the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).</p>
              </div>
            </div>
          </div>

          {/* Acceptance Box */}
          <div className="p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-xl mt-8 mb-16 border border-zinc-800 dark:border-zinc-700">
            <h4 className="text-lg font-bold mb-4">Acknowledge Policy</h4>
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-6 h-6 rounded border-2 border-zinc-600 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors"></div>
                <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div>
                <p className="font-medium">I have read and agree to the Privacy Policy</p>
                <p className="text-sm text-zinc-400 mt-1">By checking this box, you acknowledge that you understand how your data is handled.</p>
              </div>
            </label>
          </div>

        </div>
      </div>

      {/* Floating Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 z-50 pointer-events-auto"
        style={{ pointerEvents: showBackToTop ? 'auto' : 'none' }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
