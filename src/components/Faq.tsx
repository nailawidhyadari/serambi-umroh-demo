import type { Tanya } from "@/data/faq";

export function Faq({ items }: { items: Tanya[] }) {
  return (
    <div className="divide-y divide-garis border-y border-garis">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-5 text-left">
            <span className="text-lg font-semibold leading-snug">{f.q}</span>
            <span className="plus mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-tinta/25 text-xl leading-none transition group-open:bg-tinta group-open:text-kertas">
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-tinta-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
