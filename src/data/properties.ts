export interface ManagedProperty {
  id: string;
  /** TODO: replace with the real area once listings are confirmed. */
  area: string;
  /** TODO: replace with the real property description. */
  typeLabel: string;
  priceTTD: number;
  priceKind: "rent" | "sale";
  imageSrc: string;
}

/**
 * Deliberately minor — three placeholders, not a portal. Replace with
 * real listings and photography (3:2) before launch; keep prices in TTD,
 * the currency switcher handles the rest.
 */
export const MANAGED_PROPERTIES: ManagedProperty[] = [
  {
    id: "prop-1",
    area: "[Area, Trinidad & Tobago]",
    typeLabel: "[Property type — beds/baths]",
    priceTTD: 8_500,
    priceKind: "rent",
    imageSrc: "/assets/prop-1.jpg",
  },
  {
    id: "prop-2",
    area: "[Area, Trinidad & Tobago]",
    typeLabel: "[Office space — sq ft]",
    priceTTD: 14_000,
    priceKind: "rent",
    imageSrc: "/assets/prop-2.jpg",
  },
  {
    id: "prop-3",
    area: "[Area, Trinidad & Tobago]",
    typeLabel: "[Property type — beds/baths]",
    priceTTD: 2_400_000,
    priceKind: "sale",
    imageSrc: "/assets/prop-3.jpg",
  },
];
