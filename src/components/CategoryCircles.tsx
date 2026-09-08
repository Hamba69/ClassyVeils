import Image from "next/image";
import Link from "next/link";
import { Category, photoUrl } from "@/lib/types";

export function kidsCategory(categories: Category[]) {
  return categories.find((category) =>
    /kids|children/i.test(`${category.slug} ${category.label}`),
  );
}

export default function CategoryCircles({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <nav className="category-circles" aria-label="Fabric categories">
      {categories.map((category) => (
        <Link
          href={`/shop?category=${encodeURIComponent(category.slug)}`}
          key={category.slug}
          className="category-link"
        >
          <span className="category-ring">
            {category.header_photo ? (
              <Image
                src={photoUrl(category.header_photo)}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            ) : (
              <span className="category-initial" aria-hidden="true">
                {category.label.charAt(0)}
              </span>
            )}
          </span>
          <span>{category.label}</span>
        </Link>
      ))}
    </nav>
  );
}
