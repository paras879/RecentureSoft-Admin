"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TableOfContents({ sections, activeSection }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scroll = totalScroll / windowHeight || 0;
          setProgress(scroll);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-32">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500 rounded-full origin-left"
          style={{ scaleX: progress }}
        />
      </div>

      <div className="hidden lg:block">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-4">
          Contents
        </h4>
        <nav className="flex flex-col space-y-1 relative border-l border-zinc-200 dark:border-zinc-800 pl-4">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`text-sm py-1.5 transition-colors duration-200 ${
                activeSection === section.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {section.title}
            </a>
          ))}
          
          {/* Active indicator line */}
          {activeSection && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-[-1px] w-[2px] bg-blue-500 rounded-full"
              initial={false}
              animate={{
                top: sections.findIndex(s => s.id === activeSection) * 32 + 16,
                height: 20
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </nav>
      </div>
    </div>
  );
}

export default React.memo(TableOfContents);
