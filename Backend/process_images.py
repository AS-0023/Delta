import glob
import os
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

target_files = files[-3:]

out_names = [
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-itsm-board.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-analytics-board.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-advanced-itsm-board.png"
]

bg_color = (255, 255, 255)

for i in range(3):
    img = Image.open(target_files[i]).convert('RGB')
    draw = ImageDraw.Draw(img)
    # Jira Service Management is longer, cover up to 250
    draw.rectangle([(32, 8), (250, 35)], fill=bg_color)
    img.save(out_names[i])
    print(f"Processed {target_files[i]} -> {os.path.basename(out_names[i])}")
