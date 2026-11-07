import { ArrowUpRight } from "lucide-react";
import { openSource } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";

export default function OpenSource() {
  return (
    <section id="open-source" className="w-full mt-4" aria-labelledby="open-source-title">
      <SectionHeader title="Open Source" id="open-source-title" />
      <div className="flex flex-col gap-4">
        {openSource.map((item) => (
          <div
            key={item.org}
            className="py-2 border-b border-dashed border-neutral-300 dark:border-neutral-800 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div className="min-w-0">
                <h3 className="font-semibold text-base md:text-lg text-neutral-950 dark:text-neutral-50">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline underline-offset-4"
                  >
                    {item.org}
                    <ArrowUpRight className="w-4 h-4 opacity-60" aria-hidden="true" />
                  </a>
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-custom2">
                  {item.role}
                </p>
              </div>
              <div className="text-xs md:text-sm font-semibold text-neutral-950 dark:text-neutral-50 sm:text-right shrink-0">
                {item.dates}
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-custom2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
