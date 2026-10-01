import { productMetrics } from "@/lib/systems";

export function Stats() {
  return (
    <section
      aria-label="Product statistics"
      className="border-y border-border bg-[#EBE4D6]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {productMetrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`px-4 py-8 sm:px-6 sm:py-10 ${
              index % 2 === 1 ? "border-l border-border" : ""
            } ${index > 1 ? "border-t border-border lg:border-t-0" : ""} ${
              index > 0 ? "lg:border-l lg:border-border" : ""
            }`}
          >
            <p className="font-display text-3xl tracking-[-0.03em] text-foreground sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
