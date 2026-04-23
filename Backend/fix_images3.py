import glob
import os
import shutil
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort() # Sort alphabetically! since filenames contain timestamp

# Based on alphabetical sort of the timestamp in filenames:
target_hr = files[-4]        # 755 HR upload
target_mkt_proj = files[-3]  # 770 Timeline
target_mkt_content = files[-2] # 770 Calendar
target_mkt_svc = files[-1]   # 770 Form

bg_color = (255, 255, 255)

imgs = [
    (target_hr, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-hr.png"),
    (target_mkt_proj, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-project-management.png"),
    (target_mkt_content, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-content-management.png"),
    (target_mkt_svc, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-service-management.png")
]

for src, dest in imgs:
    img = Image.open(src).convert('RGB')
    draw = ImageDraw.Draw(img)
    draw.rectangle([(32, 8), (280, 42)], fill=bg_color)
    img.save(dest)
    print(f"Mapped correctly: {os.path.basename(src)} to {os.path.basename(dest)}")
