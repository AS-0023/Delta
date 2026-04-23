import glob
import os
import shutil
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

target_hr = files[-7] # 755 HR upload
target_mkt_proj = files[-6] # 758 Project mgmt upload
target_mkt_svc = files[-2] # 770 Mkt svc
target_mkt_content = files[-1] # 770 Content

bg_color = (255, 255, 255)

imgs = [
    (target_hr, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-hr.png"),
    (target_mkt_proj, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-project-management.png"),
    (target_mkt_svc, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-service-management.png"),
    (target_mkt_content, r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-content-management.png")
]

for src, dest in imgs:
    img = Image.open(src).convert('RGB')
    draw = ImageDraw.Draw(img)
    draw.rectangle([(32, 8), (280, 42)], fill=bg_color)
    img.save(dest)
    print(f"Saved {os.path.basename(dest)}")
