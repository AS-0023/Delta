import glob
import os
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

target_files = files[-2:]

out_names = [
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-content-management.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-service-management.png"
]

bg_color = (255, 255, 255)

for i in range(2):
    img = Image.open(target_files[i]).convert('RGB')
    draw = ImageDraw.Draw(img)
    # The first image (calendar) has Jira Work Management, it needs a white bar.
    # The second one is a form (no Jira bar at top left, but I can apply it safely).
    draw.rectangle([(32, 8), (280, 42)], fill=bg_color)
    img.save(out_names[i])
    print(f"Processed {target_files[i]} -> {os.path.basename(out_names[i])}")
