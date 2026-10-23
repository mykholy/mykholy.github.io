#!/usr/bin/env python3
"""Export consistent JPEG sharing cards; retain WebP for fast on-site rendering."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "assets/images/articles"
FALLBACK = IMAGES / "ai-architecture-hero.webp"
SIZE = (1200, 630)


def jpg(src: Path, dest: Path) -> None:
    if src.stat().st_size < 1024:
        src = FALLBACK
    with Image.open(src) as original:
        img = ImageOps.fit(original.convert("RGB"), SIZE, method=Image.Resampling.LANCZOS, centering=(.5, .5))
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "JPEG", quality=85, optimize=True, progressive=True, subsampling=0)


def main() -> None:
    jpg(ROOT / "assets/portfolio-social.webp", ROOT / "assets/portfolio-social.jpg")
    for webp in sorted(IMAGES.glob("*-hero.webp")):
        jpg(webp, IMAGES / (webp.stem.removesuffix("-hero") + "-share.jpg"))
    print("Generated social JPEGs at 1200x630, with validated fallback images.")


if __name__ == "__main__":
    main()
