import React from 'react';

export const DataFlowIllustration = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto max-w-md mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flow-grad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" stopOpacity="0.2"/>
        <stop offset="0.5" stopColor="#8b5cf6" stopOpacity="0.8"/>
        <stop offset="1" stopColor="#10b981" stopOpacity="0.2"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <path d="M 50 100 Q 150 20, 200 100 T 350 100" stroke="url(#flow-grad)" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
    
    {/* User Node */}
    <circle cx="50" cy="100" r="24" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" filter="url(#glow)"/>
    <rect x="42" y="90" width="16" height="20" rx="4" fill="#3b82f6"/>
    <circle cx="50" cy="84" r="6" fill="#3b82f6"/>
    
    {/* Server Node */}
    <circle cx="200" cy="100" r="32" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" filter="url(#glow)"/>
    <path d="M 188 90 H 212 V 110 H 188 Z" fill="none" stroke="#8b5cf6" strokeWidth="2" />
    <line x1="188" y1="96" x2="212" y2="96" stroke="#8b5cf6" strokeWidth="2"/>
    <line x1="188" y1="104" x2="212" y2="104" stroke="#8b5cf6" strokeWidth="2"/>
    
    {/* Database Node */}
    <circle cx="350" cy="100" r="24" fill="#1e293b" stroke="#10b981" strokeWidth="2" filter="url(#glow)"/>
    <ellipse cx="350" cy="90" rx="10" ry="4" fill="none" stroke="#10b981" strokeWidth="2"/>
    <path d="M 340 90 V 110 A 10 4 0 0 0 360 110 V 90" fill="none" stroke="#10b981" strokeWidth="2"/>
    
    {/* Labels */}
    <text x="50" y="145" fill="currentColor" fontSize="12" textAnchor="middle" className="font-medium opacity-70">You</text>
    <text x="200" y="155" fill="currentColor" fontSize="12" textAnchor="middle" className="font-medium opacity-70">Secure Servers</text>
    <text x="350" y="145" fill="currentColor" fontSize="12" textAnchor="middle" className="font-medium opacity-70">Encrypted Storage</text>
  </svg>
);

export const SecurityShieldIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shield-grad" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <filter id="shield-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Outer Glow */}
    <path d="M100 20 L160 40 V90 C160 140 100 180 100 180 C100 180 40 140 40 90 V40 L100 20Z" fill="#10b981" fillOpacity="0.1" filter="url(#shield-glow)"/>
    
    {/* Shield Body */}
    <path d="M100 25 L150 42 V90 C150 135 100 170 100 170 C100 170 50 135 50 90 V42 L100 25Z" fill="url(#shield-grad)" stroke="#34d399" strokeWidth="2" strokeLinejoin="round"/>
    
    {/* Inner detail */}
    <path d="M100 40 V155 C125 125 135 95 135 90 V52 L100 40Z" fill="#ffffff" fillOpacity="0.1"/>
    
    {/* Checkmark */}
    <path d="M80 95 L95 110 L125 75" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
