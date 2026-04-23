import glob
import os
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

target_files = files[-4:]

out_names = [
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-itsm.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-hr.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-advanced-itsm.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-analytics.png"
]

bg_color = (255, 255, 255)

for i in range(4):
    img = Image.open(target_files[i]).convert('RGB')
    draw = ImageDraw.Draw(img)
    # Target files 0, 1, 2 have the Jira bar. File 3 doesn't.
    if i < 3:
        # Jira Service Management is long. Let's cover from x=32 to x=280 just to be safe.
        draw.rectangle([(32, 8), (280, 35)], fill=bg_color)
    img.save(out_names[i])
    print(f"Processed {target_files[i]} -> {os.path.basename(out_names[i])}")
