import glob
import os
import shutil
from PIL import Image, ImageDraw

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

bg_color = (255, 255, 255)

# We expect Timeline, Calendar, Form, HR List to be in the last 10 files.
html_content = "<html><body>"

for idx in range(-10, 0):
    src = files[idx]
    dest = f"C:\\Users\\girim\\.gemini\\antigravity\\scratch\\ReactPythonProject\\frontend\\public\\images\\test_img_{idx}.png"
    
    img = Image.open(src).convert('RGB')
    draw = ImageDraw.Draw(img)
    draw.rectangle([(32, 8), (280, 42)], fill=bg_color)
    img.save(dest)
    
    html_content += f"<h2>test_img_{idx}.png</h2><img src='/images/test_img_{idx}.png' style='max-width:800px;'/><br/><br/>"

html_content += "</body></html>"

with open(r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\test.html", "w") as f:
    f.write(html_content)

print("Created test.html")
