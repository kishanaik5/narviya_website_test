import type { L } from "./why-us";

/**
 * Online estimate — rates used by /estimate.
 *
 * >>> OWNER: THESE RATES ARE PLACEHOLDERS. Set your real rates (Rs per unit) before launch.
 * The page shows customers a RANGE = quantity x [min..max] x finish multiplier, and always
 * says the final price is confirmed after the free site visit.
 */
export type Category = "interior" | "exterior";

export interface EstimateItem {
  id: string;
  category: Category;
  name: L;
  unit: { en: string; kn: string };
  /** Rs per unit */
  min: number;
  max: number;
  /** default quantity shown in the box */
  defaultQty: number;
}

const sqft = { en: "sq ft", kn: "ಚ.ಅಡಿ" };
const rft = { en: "running ft", kn: "ರನ್ನಿಂಗ್ ಅಡಿ" };

export const estimateItems: EstimateItem[] = [
  { id: "kitchen", category: "interior", name: { en: "Modular Kitchen", kn: "ಮಾಡ್ಯುಲರ್ ಕಿಚನ್" }, unit: sqft, min: 1400, max: 2400, defaultQty: 80 },
  { id: "wardrobe", category: "interior", name: { en: "Wardrobe", kn: "ವಾರ್ಡ್‌ರೋಬ್" }, unit: sqft, min: 1100, max: 2000, defaultQty: 60 },
  { id: "living", category: "interior", name: { en: "TV Unit & Living Panelling", kn: "ಟಿವಿ ಯೂನಿಟ್ ಮತ್ತು ಲಿವಿಂಗ್ ಪ್ಯಾನೆಲಿಂಗ್" }, unit: sqft, min: 900, max: 1800, defaultQty: 50 },
  { id: "ceiling", category: "interior", name: { en: "False Ceiling (POP / PVC)", kn: "ಫಾಲ್ಸ್ ಸೀಲಿಂಗ್ (POP / PVC)" }, unit: sqft, min: 90, max: 220, defaultQty: 400 },
  { id: "partition", category: "interior", name: { en: "Glass Partition", kn: "ಗ್ಲಾಸ್ ಪಾರ್ಟಿಷನ್" }, unit: sqft, min: 450, max: 1100, defaultQty: 60 },
  { id: "acp", category: "exterior", name: { en: "ACP Cladding", kn: "ACP ಕ್ಲಾಡಿಂಗ್" }, unit: sqft, min: 220, max: 480, defaultQty: 200 },
  { id: "glass", category: "exterior", name: { en: "Toughened Glass / Spider Fitting", kn: "ಟಫನ್ಡ್ ಗಾಜು / ಸ್ಪೈಡರ್ ಫಿಟ್ಟಿಂಗ್" }, unit: sqft, min: 650, max: 1400, defaultQty: 80 },
  { id: "nets", category: "exterior", name: { en: "Balcony Safety Net", kn: "ಬಾಲ್ಕನಿ ಸೇಫ್ಟಿ ನೆಟ್" }, unit: sqft, min: 14, max: 30, defaultQty: 120 },
  { id: "wpvc", category: "exterior", name: { en: "WPVC / Pergola", kn: "WPVC / ಪರ್ಗೋಲಾ" }, unit: sqft, min: 350, max: 800, defaultQty: 100 },
  { id: "railing", category: "exterior", name: { en: "Railing", kn: "ರೇಲಿಂಗ್" }, unit: rft, min: 900, max: 2500, defaultQty: 30 },
];

export const finishTiers: { id: string; label: L; mult: number }[] = [
  { id: "standard", label: { en: "Standard", kn: "ಸ್ಟ್ಯಾಂಡರ್ಡ್" }, mult: 1 },
  { id: "premium", label: { en: "Premium", kn: "ಪ್ರೀಮಿಯಂ" }, mult: 1.3 },
  { id: "luxury", label: { en: "Luxury", kn: "ಲಕ್ಸುರಿ" }, mult: 1.7 },
];

/** Indian-format rupee, rounded to the nearest 100. */
export const inr = (n: number) => "₹" + (Math.round(n / 100) * 100).toLocaleString("en-IN");

export function calcRange(item: EstimateItem, qty: number, mult: number) {
  return { low: qty * item.min * mult, high: qty * item.max * mult };
}
