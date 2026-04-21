export const FOOD_IMAGE_BASE =
  "https://fydowipmqwemknzoigqm.supabase.co/storage/v1/object/public/static/";

export function getFoodImageUrl(image?: string): string | null {
  if (!image) return null;
  return FOOD_IMAGE_BASE + image;
}
