import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  Shield,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProduct, products, type Product } from "@/data/products";
import { useCart } from "@/components/site/CartProvider";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · Avant-Garde` },
          { name: "description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="px-6 py-32 text-center text-foreground/60">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-6 py-32 text-center">
      <h1 className="font-serif text-4xl mb-4">Piece not found</h1>
      <Link to="/shop" className="text-[11px] uppercase tracking-widest border-b border-foreground">
        Return to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const p: Product = product;
  const { addToCart } = useCart();
  const [size, setSize] = useState(p.sizes[Math.floor(p.sizes.length / 2)]);
  const [color, setColor] = useState(p.colors[0].name);
  const [qty, setQty] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 24, s: 18 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((x) => {
        let s = x.s - 1;
        let m = x.m;
        let h = x.h;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) return { h: 23, m: 59, s: 59 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const recs = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="px-6 md:px-10 pt-10 pb-24">
      <nav className="text-[10px] uppercase tracking-widest text-foreground/40 flex gap-2 mb-8">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
        {/* Gallery */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[4/5] overflow-hidden rounded-xl bg-card group">
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="aspect-square overflow-hidden rounded-xl bg-card">
            <img src={p.altImage} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-xl bg-card">
            <img src={p.image} alt="" className="h-full w-full object-cover scale-150" />
          </div>
        </div>

        {/* Sticky Buy Panel */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block mb-3">
            {p.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 tracking-tight">
            {p.name}
          </h1>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-2xl font-serif">${p.price.toLocaleString()}</span>
            <span className="text-xs text-foreground/40">or 4× ${Math.round(p.price / 4)} with Affirm</span>
          </div>
          <p className="text-foreground/60 leading-relaxed mt-4 mb-8">
            {p.description}
          </p>

          {/* Countdown */}
          <div className="border border-border rounded-xl p-4 mb-8 flex items-center gap-3 text-xs text-foreground/70">
            <Clock className="h-4 w-4 text-foreground" />
            <span>Order in</span>
            <span className="font-mono tabular-nums">
              {String(timeLeft.h).padStart(2, "0")}:
              {String(timeLeft.m).padStart(2, "0")}:
              {String(timeLeft.s).padStart(2, "0")}
            </span>
            <span>for delivery by Friday</span>
          </div>

          {/* Color */}
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                Color
              </span>
              <span className="text-[10px] uppercase tracking-widest text-foreground">
                {color}
              </span>
            </div>
            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`h-10 w-10 rounded-full border-2 ${
                    color === c.name ? "border-foreground" : "border-border"
                  }`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                Size
              </span>
              <button className="text-[10px] uppercase tracking-widest text-foreground/60 underline">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-3 text-xs border rounded-lg ${
                    size === s
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex gap-3 mb-6">
            <div className="inline-flex items-center border border-border rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3" aria-label="Decrease">
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3" aria-label="Increase">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => addToCart({ productId: p.id, size, color, qty })}
              className="flex-1 bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-foreground/90"
            >
              Add to Bag · ${(p.price * qty).toLocaleString()}
            </button>
            <button className="border border-border rounded-full px-4" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <button className="w-full bg-black text-white py-3.5 text-xs font-semibold rounded-full mb-3 border border-foreground/20">
             Pay
          </button>
          <Link to="/checkout" className="block text-center w-full border border-border py-3.5 text-[11px] uppercase tracking-widest rounded-full hover:border-foreground">
            Buy Now
          </Link>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-8 text-[10px] uppercase tracking-widest text-foreground/50">
            <div className="flex flex-col items-center text-center gap-2 border border-border rounded-lg p-3">
              <Truck className="h-4 w-4" /> Free Shipping
            </div>
            <div className="flex flex-col items-center text-center gap-2 border border-border rounded-lg p-3">
              <RotateCcw className="h-4 w-4" /> 30-day Returns
            </div>
            <div className="flex flex-col items-center text-center gap-2 border border-border rounded-lg p-3">
              <Shield className="h-4 w-4" /> Lifetime Repair
            </div>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="mt-10">
            <AccordionItem value="details" className="border-border">
              <AccordionTrigger className="text-[11px] uppercase tracking-widest">
                Materials & Construction
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60 leading-relaxed">
                100% Italian virgin wool, woven in Biella. Bemberg cupro lining.
                Horn buttons. Constructed in Antwerp using traditional canvas-front
                techniques and finished by hand.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border-border">
              <AccordionTrigger className="text-[11px] uppercase tracking-widest">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60 leading-relaxed">
                Complimentary express shipping worldwide. 30-day returns from
                delivery, free for members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care" className="border-border">
              <AccordionTrigger className="text-[11px] uppercase tracking-widest">
                Care Guide
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60 leading-relaxed">
                Dry clean only. Steam to refresh between wears. Store on a wide
                wooden hanger in a breathable garment bag.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq" className="border-border">
              <AccordionTrigger className="text-[11px] uppercase tracking-widest">
                FAQ
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/60 leading-relaxed">
                Pieces run true to size; size up for layering. Custom alterations
                available at our flagship locations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-32 grid lg:grid-cols-[1fr_2fr] gap-12 pb-16 border-b border-border">
        <div>
          <h2 className="font-serif text-4xl mb-4">4.9 / 5</h2>
          <p className="text-foreground/50 text-sm">From 218 verified reviews</p>
        </div>
        <div className="space-y-8">
          {[
            { name: "Eline V.", text: "Heavier than I expected, in the best way. Holds its shape after a day of wear." },
            { name: "Marcus L.", text: "The fabric is extraordinary. Worth every cent." },
          ].map((r) => (
            <div key={r.name} className="border-b border-border pb-6">
              <div className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">
                {r.name} · Verified Buyer
              </div>
              <p className="font-serif text-lg italic">“{r.text}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="mt-24">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recs.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}