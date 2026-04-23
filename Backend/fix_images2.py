import glob
import os
import shutil
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

# Based on upload order:
# Step 755: 1 HR Image (files[-4])
# Step 770: 3 Marketing Images (files[-3], files[-2], files[-1])
target_hr = files[-4]
target_mkt_proj = files[-3] # Timeline
target_mkt_content = files[-2] # Calendar
target_mkt_svc = files[-1] # Form

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
    # Target files 0, 1, 2 need the top left Jira block covered
    # (The form doesn't strictly need it, but covering 32x8 to 280x42 on a white bg is harmless)
    draw.rectangle([(32, 8), (280, 42)], fill=bg_color)
    img.save(dest)
    print(f"Mapped {os.path.basename(src)} to {os.path.basename(dest)}")
