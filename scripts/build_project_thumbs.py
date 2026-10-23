#!/usr/bin/env python3
"""Create light WebP previews for project cards without touching original hero art."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / 'assets/images'


def main() -> None:
    created = 0
    for source in sorted(DIR.glob('*.webp')):
        if source.stem.endswith('-thumb'):
            continue
        target = source.with_name(source.stem + '-thumb.webp')
        with Image.open(source) as original:
            photo = original.convert('RGB')
            photo.thumbnail((840, 840), Image.Resampling.LANCZOS)
            photo.save(target, 'WEBP', quality=67, method=6)
        created += 1
    print('Created', created, 'resized local project/card WebP previews')


if __name__ == '__main__':
    main()
