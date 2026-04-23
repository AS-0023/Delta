import glob
import os
from PIL import Image, ImageDraw

# Get all media png files
files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
# Sort by creation time
files.sort(key=os.path.getctime)

target_files = files[-2:]

out_names = [
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-procurement-board.png",
    r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-process-control-board.png"
]

bg_color = (255, 255, 255)

for i in range(2):
    img = Image.open(target_files[i]).convert('RGB')
    draw = ImageDraw.Draw(img)
    # Jira Work Management is long, cover up to 250
    draw.rectangle([(32, 8), (250, 35)], fill=bg_color)
    img.save(out_names[i])
    print(f"Processed {target_files[i]} -> {os.path.basename(out_names[i])}")
