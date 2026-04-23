import glob
import os
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

target_hr = files[-2]
target_mkt = files[-1]

bg_color = (255, 255, 255)

# HR Image
img_hr = Image.open(target_hr).convert('RGB')
draw_hr = ImageDraw.Draw(img_hr)
# Jira Service Management padding
draw_hr.rectangle([(32, 8), (280, 35)], fill=bg_color)
out_hr = r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\sm-hr.png"
img_hr.save(out_hr)
print(f"Processed HR: {target_hr}")

# Marketing Image
img_mkt = Image.open(target_mkt).convert('RGB')
draw_mkt = ImageDraw.Draw(img_mkt)
# Jira Work Management padding
draw_mkt.rectangle([(32, 8), (250, 35)], fill=bg_color)
out_mkt = r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\marketing-project-management.png"
img_mkt.save(out_mkt)
print(f"Processed Marketing: {target_mkt}")
