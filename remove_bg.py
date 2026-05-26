import rembg
from PIL import Image
import io

def process(input_path, output_path):
    print(f"Processing {input_path}...")
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = rembg.remove(input_data)
        with open(output_path, 'wb') as o:
            o.write(output_data)
    print(f"Saved to {output_path}")

try:
    process(r"C:\Users\annas\.gemini\antigravity\brain\06f1ef9b-ded1-4682-b11b-118398e1f937\media__1779764582612.png", r"c:\Users\annas\Videos\SCANN BARANG\public\logo-icon.png")
    process(r"C:\Users\annas\.gemini\antigravity\brain\06f1ef9b-ded1-4682-b11b-118398e1f937\media__1779764640360.jpg", r"c:\Users\annas\Videos\SCANN BARANG\public\logo-full.png")
except Exception as e:
    print(f"Error: {e}")
