"use client"
import { useLocale } from 'next-intl';
import React, { useState, useEffect, useRef } from 'react';

const StickyDiv = ({ children,isSticky }: any) => {
  const locale = useLocale();
  // const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const [initialRight, setInitialRight] = useState(0);

  const initialSticky = typeof window !== 'undefined' && window.scrollY >= 225;

  useEffect(() => {
    const handleScroll = () => {
      if (!isSticky) calculateInitialRight();
      // const scrollPosition = window.scrollY;
      // setIsSticky(scrollPosition >= 225);
    };

    const calculateInitialRight = () => {
      if (stickyRef.current) {
        // @ts-ignore
        const rect = stickyRef.current.getBoundingClientRect();
        const pixels = window.innerWidth - (locale === 'en' ? rect.right : rect.left);
        setInitialRight(pixels);
      }
    };

    calculateInitialRight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateInitialRight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateInitialRight);
    };
  }, []);

  return (

    <div
      ref={stickyRef}
      key={locale}
      className={`${isSticky ? 'fixed md:top-[70px] top-16 z-[60] rtl:left-4 rtl:md:left-auto md:scale-0 md:transform-none scale-125 shadow-xl' : ''}`}
    >
      {children}
    </div>
  );
};

export default StickyDiv;
