import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/collections/winter-archive", label: "Collections" },
  { to: "/blog", label: "Editorial" },
  { to: "/about", label: "Archive" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { items, openCart } = useCart();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      <div className="w-full border-b border-border/60 bg-background text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground py-2">
        Complimentary global shipping over $500 · 30-day archive returns
      </div>
      <nav className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:h-20 md:px-10">
          <button
            className="md:hidden -ml-2 p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link
            to="/"
            className="font-serif text-xl tracking-tighter md:text-2xl"
          >
            AVANT-GARDE
          </Link>

          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.22em] font-medium text-foreground/60">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="hover:text-foreground transition-colors data-[status=active]:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-5 text-foreground/70">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="p-2 hover:text-foreground transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:text-foreground hidden sm:inline-flex">
              <Heart className="h-4 w-4" />
            </Link>
            <Link to="/account" aria-label="Account" className="p-2 hover:text-foreground hidden sm:inline-flex">
              <User className="h-4 w-4" />
            </Link>
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative p-2 hover:text-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-0 -right-0 h-4 min-w-4 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/60 bg-background px-6 py-8 flex flex-col gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-2xl font-serif text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="fixed inset-0 z-50 glass animate-fade-up" onClick={onClose}>
      <div
        className="mx-auto max-w-3xl px-6 pt-32"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border pb-4">
          <Search className="h-5 w-5 text-foreground/40" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the archive…"
            className="flex-1 bg-transparent px-4 py-2 text-2xl font-serif outline-none placeholder:text-foreground/30"
          />
          <button
            onClick={onClose}
            className="text-[10px] uppercase tracking-widest text-foreground/60 hover:text-foreground"
          >
            Esc
          </button>
        </div>
        <div className="mt-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-4">
            Trending
          </p>
          <div className="flex flex-wrap gap-2">
            {["Cashmere", "Overcoat", "Chelsea Boot", "Tailoring", "Atrium Tote"].map(
              (t) => (
                <Link
                  key={t}
                  to="/search"
                  onClick={onClose}
                  className="rounded-full border border-border px-4 py-2 text-xs text-foreground/70 hover:border-foreground hover:text-foreground transition-colors"
                >
                  {t}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}