#!/usr/bin/env python3
"""Build mobile-sized article preview images while retaining high-resolution originals."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / 'assets/images/articles'
FALLBACK = ROOT / 'ai-architecture-thumb.webp'

def main():
    n = 0
    for source in sorted(ROOT.glob('*-thumb.webp')):
        chosen = source if source.stat().st_size > 1024 else FALLBACK
        with Image.open(chosen) as original:
            image = original.convert('RGB')
            image.thumbnail((420, 420), Image.Resampling.LANCZOS)
            target = ROOT / source.name.replace('-thumb.webp', '-small.webp')
            image.save(target, 'WEBP', quality=65, method=6)
        n += 1
    print('Generated', n, 'small article preview assets for responsive srcset.')

if __name__ == '__main__':
    main()
