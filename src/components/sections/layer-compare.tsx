import { Reveal } from "@/components/ui/reveal";
import { CompareSlider } from "@/components/kinetics";

const layers = [
  { id: "01", name: "Osteology", note: "Landmarks, lines, and the joints that move." },
  { id: "02", name: "Myology", note: "Compartments layered superficial to deep." },
  { id: "03", name: "Relation", note: "Drag the handle — origin and insertion read on one plate." },
];

export function LayerCompare() {
  return (
    <section
      id="layers"
      className="border-y border-border bg-[#EBE4D6] px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-primary">
              Layer compare
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] sm:text-4xl">
              Peel the muscle back to the bone.
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
              Every region in Corpus is stacked. Wipe between plates to see how a muscle sits on its skeleton — the relation you need for the exam, and for the ward.
            </p>
            <ol className="mt-8 space-y-4 border-t border-border pt-6">
              {layers.map((layer) => (
                <li key={layer.id} className="flex gap-4">
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-muted">
                    {layer.id}
                  </span>
                  <div>
                    <p className="font-display text-lg tracking-[-0.02em]">{layer.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{layer.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <CompareSlider
              before={{
                src: "/images/system-skeletal.jpg",
                alt: "Skeletal atlas plate",
                label: "Skeletal",
              }}
              after={{
                src: "/images/system-muscular.jpg",
                alt: "Muscular atlas plate",
                label: "Muscular",
              }}
              initial={56}
              className="aspect-[4/3] sm:aspect-[16/10]"
            />
            <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              Drag or use ← → to compare layers
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
