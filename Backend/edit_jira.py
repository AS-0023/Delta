from PIL import Image, ImageDraw

filename = r"C:\Users\girim\.gemini\antigravity\brain\1b1528f2-d17f-4bf3-9520-4f6cafd693ab\media__1771835516855.png"
outname = r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-bug-tracking.png"
img = Image.open(filename).convert('RGB')
draw = ImageDraw.Draw(img)

# The blue diamond starts around x=43.
# The top nav bar background is pure white.
bg_color = (255, 255, 255)

# Redraw the rectangle over the text with pure white
draw.rectangle([(32, 8), (175, 35)], fill=bg_color)

img.save(outname)
print("Saved modified bug tracking image successfully with pure white background.")
