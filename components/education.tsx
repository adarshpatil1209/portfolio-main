import { education } from "@/lib/profile";
import { SectionHeader } from "@/components/section-header";

export default function Education() {
  return (
    <section id="education" className="w-full mt-4" aria-labelledby="education-title">
      <SectionHeader title="Education" id="education-title" />
      <div className="flex flex-col gap-4">
        {education.map((item) => (
          <div
            key={item.school}
            className="py-2 border-b border-dashed border-neutral-300 dark:border-neutral-800 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div className="min-w-0">
                <h3 className="font-semibold text-base md:text-lg text-neutral-950 dark:text-neutral-50">
                  {item.school}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-custom2">
                  {item.degree}
                </p>
              </div>
              <div className="sm:text-right shrink-0">
                <div className="text-xs md:text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                  {item.dates}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {item.location}
                </div>
              </div>
            </div>
            {item.details && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-custom2">
                {item.details}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
