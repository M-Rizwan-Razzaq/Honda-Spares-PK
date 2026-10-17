import type { MotorcycleModel } from "@/types/product";

export const motorcycleModels: MotorcycleModel[] = [
  {
    id: "cd-70",
    name: "Honda CD 70",
    shortName: "CD 70",
    imageSrc: "/images/models/cd-70.webp",
    description:
      "Pakistan's most-used 70cc commuter. Engine internals, cables, brakes and routine maintenance parts.",
  },
  {
    id: "cd-70-dream",
    name: "Honda CD 70 Dream",
    shortName: "CD 70 Dream",
    imageSrc: "/images/models/cd-70-dream.webp",
    description:
      "The updated 70cc Dream variant — electricals, filters, body parts and service kits.",
  },
  {
    id: "pridor",
    name: "Honda Pridor",
    shortName: "Pridor",
    imageSrc: "/images/models/pridor.webp",
    description:
      "100cc commuter motorcycle. Clutch, carburettor, wheel and chassis parts listed by fitment.",
  },
  {
    id: "cg-125",
    name: "Honda CG 125",
    shortName: "CG 125",
    imageSrc: "/images/models/cg-125.webp",
    description:
      "The classic 125cc workhorse. Engine, clutch, suspension and body components.",
  },
  {
    id: "cg-125-special",
    name: "Honda CG 125 Special Edition",
    shortName: "CG 125 SE",
    imageSrc: "/images/models/cg-125-special.webp",
    description:
      "Special Edition trim of the CG 125. Confirm exact fitment for cosmetic and body parts.",
  },
  {
    id: "cb-125f",
    name: "Honda CB 125F",
    shortName: "CB 125F",
    imageSrc: "/images/models/cb-125f.webp",
    description:
      "125cc street bike with disc brake and electric start. Pads, bearings and electrical parts.",
  },
  {
    id: "cb-150f",
    name: "Honda CB 150F",
    shortName: "CB 150F",
    imageSrc: "/images/models/cb-150f.webp",
    description:
      "150cc street motorcycle. Brake, chain-drive and electrical components by request.",
  },
  {
    id: "cg-150",
    name: "Honda CG 150",
    shortName: "CG 150",
    imageSrc: "/images/models/cg-150.webp",
    description:
      "Listed for catalog completeness. Current availability is confirmed on request.",
  },
];

export const modelById = new Map(motorcycleModels.map((model) => [model.id, model]));

export function getModelNames(ids: string[]): string[] {
  return ids.map((id) => modelById.get(id)?.name ?? id);
}
