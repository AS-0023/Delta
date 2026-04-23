from PIL import Image

filename = r"C:\Users\girim\.gemini\antigravity\brain\1b1528f2-d17f-4bf3-9520-4f6cafd693ab\media__1771834270275.png"
img = Image.open(filename).convert("RGB")
width, height = img.size
print(f"Size: {width} x {height}")

# Find blue pixels of the logo in the top half
for y in range(0, int(height/2)):
    for x in range(0, width):
        r, g, b = img.getpixel((x, y))
        # blue colors roughly (0, 82, 204) or (38, 132, 255)
        if b > 200 and r < 100 and g < 150:
            print(f"Blue pixel found at: {x}, {y}, color: {r},{g},{b}")
            sys.exit(0)
