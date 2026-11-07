import { Trophy } from "lucide-react";
import { achievements } from "@/lib/profile";
import { SectionHeader, cardClass } from "@/components/section-header";

export default function Achievements() {
  return (
    <section id="achievements" className="w-full mt-4" aria-labelledby="achievements-title">
      <SectionHeader title="Achievements & Hackathons" id="achievements-title" />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item) => (
          <li key={item.event} className={cardClass}>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-400">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              {item.title}
            </div>
            <h3 className="mt-2 font-semibold text-base text-neutral-950 dark:text-neutral-50">
              {item.event}
            </h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 font-custom2">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
