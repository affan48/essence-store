import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 pt-24 pb-12 px-6 md:px-10 border-t border-border/60">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <div className="font-serif text-3xl mb-6 tracking-tighter">
              AVANT-GARDE
            </div>
            <p className="text-sm text-foreground/40 max-w-xs leading-relaxed">
              Subscribe for private access to the Archive collection and seasonal
              journals from the Antwerp studio.
            </p>
            <form
              className="mt-8 flex border-b border-border py-2 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="EMAIL@ADDRESS.COM"
                className="bg-transparent text-[11px] uppercase tracking-widest w-full outline-none placeholder:text-foreground/30"
              />
              <button className="text-[11px] uppercase tracking-widest font-semibold">
                Join
              </button>
            </form>
          </div>
          <FooterCol
            label="Support"
            links={[
              { to: "/contact", label: "Contact" },
              { to: "/orders/$id", params: { id: "AG-204881" }, label: "Order Tracking" },
              { to: "/account", label: "Returns" },
              { to: "/contact", label: "Shipping" },
            ]}
          />
          <FooterCol
            label="House"
            links={[
              { to: "/about", label: "Our Story" },
              { to: "/blog", label: "Editorial" },
              { to: "/shop", label: "Shop All" },
              { to: "/wishlist", label: "Wishlist" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-[10px] text-foreground/30 uppercase tracking-[0.22em]">
          <span>© 2026 AVANT-GARDE INTERNATIONAL</span>
          <div className="flex gap-6">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>Vimeo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  links,
}: {
  label: string;
  links: { to: string; params?: Record<string, string>; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-4 text-[10px] uppercase tracking-widest">
      <span className="text-foreground/40">{label}</span>
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to as string}
          params={l.params as never}
          className="text-foreground/80 hover:text-foreground"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}