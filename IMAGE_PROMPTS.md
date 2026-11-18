# Narviya hero images — prompts for ChatGPT / Gemini

The mobile hero is a "walk in through the door" scroll animation. It is built from
2 (or more) images that must look like ONE continuous camera move: same lighting,
same time of day, same style, and the doorway in image 1 must line up with the
view in image 2.

Save the results over the placeholders in `public/images/`
(`scene-1-exterior.webp`, `scene-2-interior.webp`; extra scenes go in
`src/config/scenes.ts`). Export 1080x1920 (9:16 portrait), under ~300 KB each as WebP.

## Rules that make the animation look right
1. Image 1: a CLOSED double door (two equal teak leaves, thin seam at x = 50%) at
   lower-middle, warm light leaking from the gaps. In the animation the two leaves swing
   open and the camera steps through. After replacing the image, update `door` in
   `src/config/scenes.ts` (left / right / top / bottom / seam as fractions of the image).
2. Image 2: shot from just inside that same door, looking straight ahead; the
   vanishing point (where lines converge) is at the centre of the image.
3. Same golden-hour / warm evening light and the same materials in both
   (teak wood, black ACP cladding, toughened glass, brass details).
4. No people, no text, no logos, no watermarks.

## Prompt 1 — exterior (scene-1-exterior)
"Photorealistic architectural photograph, vertical 9:16. Front view of a luxury
modern Indian villa at golden hour, shot straight-on from the driveway at eye
level. Facade of black ACP panels, vertical teak WPVC slats and large toughened
glass windows with slim black frames. A tall wide front door, exactly centred
in the frame and in the lower middle, standing open, with warm golden light
glowing from inside the hallway. Warm brass wall lights, soft landscaping,
clean stone path leading to the door. Deep blue-black sky, cinematic, ultra
sharp, 8k, no people, no text, no logo."

## Prompt 2 — interior (scene-2-interior)
"Photorealistic interior photograph, vertical 9:16, same villa. Camera standing
just inside the front door, looking straight ahead down a hallway into a luxury
open-plan living room. One-point perspective, vanishing point at the exact
centre of the image. Teak wood panelling, fluted glass partition, brass
accents, warm indirect cove lighting, suspended POP ceiling, large sofa and
glass doors to a garden at the far end, golden-hour light, matching the
exterior. Ultra sharp, 8k, no people, no text, no logo."

## Optional scene 3 (bedroom / workspace)
Same camera idea, one more doorway deeper into the house, same lighting.
Then add it to `heroScenes` in `src/config/scenes.ts` with a `door` on scene 2
and a `focus` on scene 3.

## Tuning after you drop the images in
Open `src/config/scenes.ts`:
- `door.x / door.y` = centre of the open door in image 1 (0-1)
- `door.w` = door width as a fraction of image width (bigger door = gentler zoom)
- `focus.x / focus.y` = vanishing point in image 2
If the doorway doesn't line up with the room, nudge these numbers.

## Same images also power the desktop split
Desktop shows scene 2 (Interiors, left) and scene 1 (Exteriors, right).
