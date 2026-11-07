import React from "react";

const rule =
  "w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 -mx-2 md:-mx-14";

export function SectionHeader({ title, id }: { title: string; id?: string }) {
  return (
    <>
      <div className={`${rule} mb-2`}></div>
      <h2
        id={id}
        className="text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2 scroll-mt-24"
      >
        <span className="link--elara">{title}</span>
      </h2>
      <div className={`${rule} mb-4`}></div>
    </>
  );
}

export function SectionNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-2 py-[7px] text-sm inline-block bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6">
      {children}
    </p>
  );
}

export const cardClass =
  "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black p-4 transition-colors duration-300 hover:border-neutral-300 dark:hover:border-neutral-700";
