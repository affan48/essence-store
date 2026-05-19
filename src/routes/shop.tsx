import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Grid3x3, Grid2x2 } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop · Avant-Garde" },
      {
        name: "description",
        content:
          "Browse the full Avant-Garde shop — outerwear, knitwear, tailoring, footwear, and accessories.",
      },
    ],
  }),
  component: ShopPage,
});

const allColors = [
  { name: "Onyx", hex: "#0a0a0a" },
  { name: "Ash", hex: "#3d3d3d" },
  { name: "Smoke", hex: "#5a5a5a" },
  { name: "Ivory", hex: "#f1ead9" },
  { name: "Espresso", hex: "#3a2a1f" },
];

function ShopPage() {
  const [sort, setSort] = useState("featured");
  const [cat, setCat] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [grid, setGrid] = useState<3 | 4>(4);

  const cats = Array.from(new Set(products.map((p) => p.category)));

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) => (!cat || p.category === cat) && p.price <= maxPrice,
    );
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, maxPrice, sort]);

  return (
    <div className="px-6 md:px-10 pt-12 pb-24">
      <div className="flex flex-col gap-4 mb-12">
        <nav className="text-[10px] uppercase tracking-widest text-foreground/40 flex gap-2">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="text-foreground">Shop</span>
        </nav>
        <div className="flex flex-wrap justify-between items-end gap-6">
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight">
            All Pieces
          </h1>
          <span className="text-[11px] uppercase tracking-widest text-foreground/40">
            {filtered.length} of 64 in the archive
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-12">
        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          <FilterBlock label="Category">
            <button
              onClick={() => setCat(null)}
              className={`block text-left text-sm py-1 ${
                !cat ? "text-foreground" : "text-foreground/50 hover:text-foreground"
              }`}
            >
              All
            </button>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`block text-left text-sm py-1 ${
                  cat === c
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </FilterBlock>

          <FilterBlock label="Price">
            <input
              type="range"
              min={0}
              max={1500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-foreground"
            />
            <div className="text-xs text-foreground/60 mt-2 flex justify-between">
              <span>$0</span>
              <span>Up to ${maxPrice}</span>
            </div>
          </FilterBlock>

          <FilterBlock label="Color">
            <div className="flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  className="h-6 w-6 rounded-full border border-border ring-offset-2 ring-offset-background hover:ring-1 ring-foreground"
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </FilterBlock>

          <FilterBlock label="Size">
            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  className="h-9 min-w-9 px-3 text-xs border border-border rounded-full hover:border-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterBlock>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-foreground/60">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters Applied · {cat ?? "All"}
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => setGrid(3)}
                  className={grid === 3 ? "text-foreground" : "text-foreground/30"}
                >
                  <Grid2x2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setGrid(4)}
                  className={grid === 4 ? "text-foreground" : "text-foreground/30"}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-[11px] uppercase tracking-widest border-b border-border py-1 outline-none"
              >
                <option value="featured">Sort · Featured</option>
                <option value="price-asc">Price · Low to High</option>
                <option value="price-desc">Price · High to Low</option>
              </select>
            </div>
          </div>

          <div
            className={`grid gap-4 ${
              grid === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 mb-4">
        {label}
      </h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}