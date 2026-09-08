import type { Metadata } from "next";
import Link from "next/link";
import CollectionGallery from "@/components/CollectionGallery";
import CategoryCircles, { kidsCategory } from "@/components/CategoryCircles";
import DrapeLine from "@/components/DrapeLine";
import { getSiteText, getCategories, getAllVisibleVeils } from "@/lib/data";

export const metadata: Metadata = {
  title: "The collection | ClassyVeils",
  description:
    "Browse Anisha’s considered edit of veils and scarves, then send Anisha the reference number for the style you have in mind.",
};
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [text, categories, veils, query] = await Promise.all([
    getSiteText(),
    getCategories(),
    getAllVisibleVeils(),
    searchParams,
  ]);
  const selected = categories.find(
    (category) => category.slug === query.category,
  );
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Anisha’s edit</p>
        <h1>
          {selected ? (
            selected.label
          ) : (
            <>
              Which one caught
              <br />
              <em>
                your eye?
                <DrapeLine underline />
              </em>
            </>
          )}
        </h1>
        <p>
          {selected?.intro ||
            "Every veil has a reference number. Send it to me with your questions and I can tell you about its fabric, shade, and availability."}
        </p>
      </header>
      <section className="section-shell">
        <CategoryCircles categories={categories} />
        <div className="collection-toolbar">
          <p>
          {selected ? selected.label : "51 veils and scarves"}
          </p>
          <Link className="text-link" href="/shop">
            View the full edit
          </Link>
        </div>
        <CollectionGallery
          whatsappNumber={text.whatsapp_number}
          veils={veils}
          category={selected?.slug}
        />
        {!kidsCategory(categories) ? (
          <aside className="kids-content-gap" id="kids-veils">
            <p className="eyebrow">Kids Veils</p>
            <h2>The children’s collection is being prepared.</h2>
            <p>
              The children’s edit is being prepared. Please check back when
              Anisha’s selection is ready.
            </p>
          </aside>
        ) : null}
      </section>
    </main>
  );
}
