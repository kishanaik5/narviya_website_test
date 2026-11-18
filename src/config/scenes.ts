/**
 * Walk-in animation scenes (mobile hero) + the two desktop panels.
 *
 * HOW IT WORKS
 * The page scroll "moves the camera" through the scenes in order. Scene 0 zooms
 * toward its DOOR, then fades into scene 1 which settles from the doorway into
 * the room.  Add more scenes (hall, living room, bedroom...) by adding entries.
 *
 * Scroll walks up to the closed double door, the two leaves swing open and you step through.
 * Coordinates are fractions of the image (0-1) and every scene image must be 9:16:
 *   door  = the door rectangle + the seam between its two leaves in THIS image
 *   focus = the vanishing point of THIS image when you arrive (usually ~0.5, 0.45)
 *
 * Replace the files in /public/images with your generated ones (same names, or
 * update `src`), then tune door/focus until the doorway lines up with the next
 * image. See IMAGE_PROMPTS.md for ready-to-use generation prompts.
 */
/** Where the entrance is in an image, as fractions (0-1) of the image width / height. */
export interface DoorBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
  /** x of the seam between the two door leaves */
  seam: number;
}

export interface HeroScene {
  src: string;
  alt: string;
  /** Closed double door in this image. Not needed on the last scene. */
  door?: DoorBox;
  /** Vanishing point on arrival (inside the doorway). Not needed on the first scene. */
  focus?: { x: number; y: number };
}

export const heroScenes: HeroScene[] = [
  {
    src: "/images/scene-1-exterior.webp",
    alt: "Modern house exterior with a lit entrance",
    door: { left: 0.399, right: 0.569, top: 0.602, bottom: 0.793, seam: 0.5 },
  },
  {
    src: "/images/scene-2-interior.webp",
    alt: "Bright modern living room",
    focus: { x: 0.5, y: 0.44 },
  },
];

export const exteriorScene = heroScenes[0];
export const interiorScene = heroScenes[heroScenes.length - 1];

/** Desktop hero: ONE house, left half = interior cutaway, right half = exterior. Split line is at x = 50%. */
export const anatomyScene = {
  src: "/images/home-anatomy.webp",
  alt: "One modern home, cut in half: the interior on the left and the exterior on the right",
};
