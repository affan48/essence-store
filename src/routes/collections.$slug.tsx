import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { collections, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = collections.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { collection: c };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.collection.title} · Avant-Garde` }, { name: "description", content: loaderData.collection.description }] : [],
  }),
  notFoundComponent: () => <div className="px-6 py-32 text-center"><Link to="/shop">Browse Shop</Link></div>,
  component: () => {
    const { collection } = Route.useLoaderData();
    const items = products.filter((p) => p.collection === collection.slug);
    return (
      <div>
        <section className="relative h-[70vh] mx-6 md:mx-10 mt-10 rounded-2xl overflow-hidden">
          <img src={collection.cover} alt={collection.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60 mb-4">{collection.tagline}</p>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tight max-w-3xl">{collection.title}</h1>
          </div>
        </section>
        <section className="px-6 md:px-10 py-20">
          <p className="font-serif italic text-2xl max-w-2xl text-foreground/70 mb-16">{collection.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    );
  },
});