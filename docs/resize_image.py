#!/usr/bin/env python3
"""
Image processing script to resize images from src/original_assets
- Resize to width=1920px (maintaining aspect ratio)
- Convert to JPEG format
- Remove EXIF metadata (including GPS data)
- Save to src/assets directory
"""

import sys
from PIL import Image
import pathlib
import glob

def process_image(input_path, output_path, target_width=1920):
    """
    Process a single image: resize, convert to JPEG, remove metadata
    """
    try:
        # Open image
        with Image.open(input_path) as img:
            print(f"Processing: {input_path}")
            print(f"  Original size: {img.size}")

            # Convert to RGB if necessary (for JPEG output)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')

            # Resize if width is larger than target
            if img.width > target_width:
                # Calculate new height maintaining aspect ratio
                aspect_ratio = img.height / img.width
                new_height = int(target_width * aspect_ratio)
                img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Resized to: {img.size}")
            else:
                print(f"  No resize needed (width <= {target_width})")

            # Save without EXIF data (removes GPS and other metadata)
            img.save(output_path, 'JPEG', quality=85, optimize=True, exif=b'')
            print(f"  Saved to: {output_path}")

    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

    return True

def main():
    # Define paths
    script_dir = pathlib.Path(__file__).parent


    targets = []
    for ext in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']:
        for file_path in glob.glob(f'./**/original/*{ext}', recursive=True):
            targets.append(pathlib.Path(file_path))

    for src in targets:
        dest = src.parent.parent / (src.stem + '_gen.jpeg')
        process_image(src, dest)

if __name__ == "__main__":
    main()
