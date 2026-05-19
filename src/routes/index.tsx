import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import heroSilk from "@/assets/hero-silk.jpg";
import editorialModel from "@/assets/editorial-model.jpg";
import editorialFabric from "@/assets/editorial-fabric.jpg";
import { products, collections } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avant-Garde — The Winter Archive 01" },
      {
        name: "description",
        content:
          "A study in monochrome layering and sculptural silhouettes. Discover the Winter Archive from Avant-Garde.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="pt-10 px-6 md:px-10 pb-20">
        <div className="relative w-full h-[88vh] overflow-hidden rounded-2xl bg-card">
          <img
            src={heroSilk}
            alt="Silk fabric in motion"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
            Drop 01 — Live Now
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <h1 className="font-serif text-6xl md:text-9xl leading-[0.85] tracking-tighter mb-8 max-w-5xl text-balance animate-fade-up">
              The Winter
              <br />
              <em className="italic font-normal">Archive 01</em>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-up [animation-delay:120ms]">
              <p className="max-w-xs text-sm text-foreground/70 leading-relaxed italic">
                A study in monochrome layering and sculptural silhouettes.
                Designed for the modern wanderer.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/collections/$slug"
                  params={{ slug: "winter-archive" }}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-foreground/90 transition-all"
                >
                  Explore Collection
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 border border-border bg-background/30 backdrop-blur px-8 py-4 text-[11px] uppercase tracking-[0.2em] rounded-full hover:border-foreground"
                >
                  Shop All
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-10 flex gap-12 overflow-hidden text-foreground/30 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Shipping to 84 countries</span>
              <span>·</span>
              <span>Made in Antwerp</span>
              <span>·</span>
              <span>30-day archive returns</span>
              <span>·</span>
              <span>Hand-finished in Italy</span>
              <span>·</span>
              <span>Members get early access</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED PIECES — bento */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="flex flex-wrap gap-6 justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block mb-4">
              Curated · 06 Pieces
            </span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tight">
              Selected Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground border-b border-border pb-1"
          >
            View all 64 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-1">
            <ProductCard product={products[0]} large badge="New Arrival" />
          </div>
          <ProductCard product={products[1]} />
          <ProductCard product={products[2]} />
          <ProductCard product={products[3]} />
          <ProductCard product={products[4]} />
          <ProductCard product={products[5]} />
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <h2 className="font-serif text-5xl md:text-6xl mb-16 tracking-tight">
          The Collections
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-card"
            >
              <img
                src={c.cover}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-foreground/60 mb-2">
                    Volume 0{i + 1}
                  </p>
                  <h3 className="font-serif text-2xl">{c.title}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-card py-32 px-6 md:px-10 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block mb-8 text-center">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-7xl font-serif italic leading-tight mb-16 text-balance text-center">
            “To dress is to define the boundary between the soul and the city.”
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img
              src={editorialFabric}
              alt="Tailored fabric texture"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover rounded-lg"
            />
            <div>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6 font-serif italic">
                Each garment is meticulously drafted in our Antwerp studio,
                focusing on the dialogue between raw materials and human anatomy.
              </p>
              <p className="text-sm text-foreground/50 leading-relaxed mb-8">
                We do not follow seasons; we follow sensations. The Archive is a
                catalogue of permanent objects, refined annually rather than
                replaced.
              </p>
              <Link
                to="/about"
                className="text-[11px] uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/70"
              >
                Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLER SPOTLIGHT */}
      <section className="px-6 md:px-10 py-32 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={editorialModel}
              alt="Bestseller spotlight"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lg:pl-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block mb-6">
              Bestseller · Ref. 0091-A
            </span>
            <h3 className="font-serif text-5xl md:text-6xl mb-6 tracking-tight">
              Sculpted Wool
              <br />
              <em className="italic">Overcoat</em>
            </h3>
            <p className="text-foreground/60 leading-relaxed max-w-md mb-10">
              Densely woven Italian virgin wool with a cocoon silhouette and
              dropped shoulders. The defining piece of the Winter Archive.
            </p>
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <span className="text-2xl font-serif">$1,240</span>
              <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                4 colorways
              </span>
            </div>
            <Link
              to="/products/$id"
              params={{ id: "sculpted-wool-overcoat" }}
              className="inline-flex items-center gap-2 bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-foreground/90"
            >
              View Product
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 md:px-10 py-32 border-b border-border">
        <h2 className="font-serif text-5xl md:text-6xl mb-16 tracking-tight max-w-3xl">
          Worn by the
          <br />
          <em className="italic">discerning few.</em>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "The overcoat has the weight and discipline of something my grandfather would have owned. I'll wear it for twenty winters.",
              author: "M. Hoffmann",
              city: "Berlin",
            },
            {
              quote:
                "The only brand I trust to send me something sight-unseen. The Atrium tote is a daily ritual.",
              author: "S. Tanaka",
              city: "Kyoto",
            },
            {
              quote:
                "Restraint, executed. Avant-Garde understands the value of what is absent from the design.",
              author: "J. Marchetti",
              city: "Milan",
            },
          ].map((t) => (
            <figure
              key={t.author}
              className="border border-border rounded-xl p-8 bg-card flex flex-col gap-6"
            >
              <div className="flex gap-1 text-foreground/60">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <blockquote className="font-serif text-xl leading-snug text-balance italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto text-[10px] uppercase tracking-widest text-foreground/40">
                {t.author} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="px-6 md:px-10 py-24 border-b border-border">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight">
            <em>@avantgarde</em>
          </h2>
          <span className="text-[11px] uppercase tracking-widest text-foreground/40">
            Tag #InTheArchive
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[
            products[0],
            products[3],
            products[1],
            products[4],
            products[2],
            products[5],
          ].map((p, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-md bg-card group"
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 md:px-10 py-32 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block mb-6">
          The Bulletin
        </span>
        <h2 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight max-w-3xl mx-auto text-balance">
          Private access to the next archive drop.
        </h2>
        <p className="text-foreground/50 max-w-xl mx-auto mb-10">
          One brief letter every other week. No discount codes, no noise.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md mx-auto flex border-b border-foreground/40 pb-3"
        >
          <input
            type="email"
            placeholder="email@address.com"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/30"
          />
          <button className="text-[11px] uppercase tracking-widest font-semibold">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
