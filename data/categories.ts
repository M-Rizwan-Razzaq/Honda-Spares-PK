import {
  BatteryFull,
  CircleDot,
  Cog,
  Disc3,
  Droplet,
  Flame,
  Frame,
  Fuel,
  Lightbulb,
  Link,
  MoveVertical,
  Repeat,
  Spline,
  Wrench,
  Wind,
  Zap,
  Armchair,
  Eye,
  Package,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Category } from "@/types/product";

export interface CategoryWithIcon extends Category {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  imageSrc?: string;
}

export const categories: CategoryWithIcon[] = [
  {
    id: "engine",
    name: "Engine Parts",
    description: "Pistons, rings, cylinders, chains and top-end components.",
    icon: Cog,
  },
  {
    id: "clutch-transmission",
    name: "Clutch & Transmission",
    description: "Clutch plates, centres, gears and shift components.",
    icon: Repeat,
  },
  {
    id: "brakes",
    name: "Brakes",
    description: "Brake shoes, disc pads, master cylinders and hardware.",
    icon: Disc3,
    imageSrc: "/images/parts/brake-shoes.webp",
  },
  {
    id: "electrical",
    name: "Electrical Parts",
    description: "CDI units, rectifiers, coils and wiring components.",
    icon: Zap,
  },
  {
    id: "suspension",
    name: "Suspension",
    description: "Fork seals, shock absorbers and related fitting parts.",
    icon: MoveVertical,
  },
  {
    id: "chain-sprocket",
    name: "Chain & Sprocket Kits",
    description: "Drive chains, sprockets and full replacement kits.",
    icon: Link,
    imageSrc: "/images/parts/chain-sprocket-kit.webp",
  },
  {
    id: "body-parts",
    name: "Body Parts & Fairings",
    description: "Tank, fenders, side covers and headlight cowls.",
    icon: Frame,
  },
  {
    id: "fuel-system",
    name: "Fuel System & Carburettor",
    description: "Carburettors, fuel cocks, jets and repair kits.",
    icon: Fuel,
  },
  {
    id: "air-filters",
    name: "Air Filters",
    description: "Filter elements and housings for daily-running engines.",
    icon: Wind,
    imageSrc: "/images/parts/air-filter.webp",
  },
  {
    id: "oil-filters",
    name: "Oil Filters",
    description: "Oil strainers, filter elements and sealing gaskets.",
    icon: Droplet,
  },
  {
    id: "cables-levers",
    name: "Cables & Levers",
    description: "Clutch, throttle and brake cables; alloy levers.",
    icon: Spline,
  },
  {
    id: "wheels-tyres",
    name: "Wheels & Tyres",
    description: "Bearings, tubes, spokes and wheel fitment parts.",
    icon: CircleDot,
  },
  {
    id: "lights-indicators",
    name: "Lights & Indicators",
    description: "Headlights, tail lights, bulbs and turn signals.",
    icon: Lightbulb,
    imageSrc: "/images/parts/headlight.webp",
  },
  {
    id: "mirrors",
    name: "Mirrors",
    description: "Rear-view mirror pairs and mirror stems.",
    icon: Eye,
  },
  {
    id: "seats",
    name: "Seats",
    description: "Seat covers, foam and full seat assemblies.",
    icon: Armchair,
  },
  {
    id: "batteries",
    name: "Batteries",
    description: "Maintenance-free and conventional 12V batteries.",
    icon: BatteryFull,
  },
  {
    id: "spark-plugs",
    name: "Spark Plugs",
    description: "Standard and iridium plugs for 70cc to 150cc engines.",
    icon: Flame,
    imageSrc: "/images/parts/spark-plug.webp",
  },
  {
    id: "hardware",
    name: "Nuts, Bolts & Fittings",
    description: "Body bolt kits, fasteners and small fitting hardware.",
    icon: Wrench,
  },
  {
    id: "service-kits",
    name: "Maintenance & Service Kits",
    description: "Bundled periodic-service parts for common schedules.",
    icon: Package,
  },
];

export const categoryById = new Map(categories.map((category) => [category.id, category]));

export function getCategoryName(id: string): string {
  return categoryById.get(id)?.name ?? id;
}
