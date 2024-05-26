"use client";
import React, { useState, useEffect, useRef } from "react";

const StickyDivParent = ({ children }: any) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stickyAnchor = document.querySelector(
      "#sticky"
    ) as HTMLElement;
    const div_top2 = stickyAnchor.getBoundingClientRect().top;
    function sticky_relocate() {
      const sticky = stickyRef.current;
      const footer = document.querySelector("footer") as HTMLElement;
      const StopSticky = document.querySelector("#StopSticky") as HTMLElement;
      const stickyElemnt = document.querySelector("#sticky") as HTMLElement;
      if (!sticky || !StopSticky || !stickyAnchor || !stickyElemnt) {
        // Exit early if any of the required elements are missing
        return;
      }
      const window_top = window.scrollY;
      const StopSticky_top = StopSticky.offsetTop ?? 0;
      const div_top = stickyElemnt.offsetTop ?? 0;
      const div_top3 = stickyElemnt.getBoundingClientRect().top;
      const div_height = sticky.clientHeight ?? 0;
      const padding = 24;
      if (window_top + div_height > StopSticky_top - padding) {
        let negTop = (window_top + div_height - StopSticky_top + padding) * -1;
        sticky.style.top = negTop + "px";
      } else if (window_top >= (div_top2 - padding)) {
        setIsSticky(true);
        sticky.style.top = "24px";
      } else {
        setIsSticky(false);
        sticky.style.top = "auto";
      }
    }

    window.addEventListener("scroll", sticky_relocate);

    return () => {
      window.removeEventListener("scroll", sticky_relocate);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div id="sticky-anchor"></div>
      <div
        ref={stickyRef}
        id="sticky"
        className={`${isSticky ? "lg:fixed z-40" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyDivParent;
