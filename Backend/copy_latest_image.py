import glob
import os
import shutil

files = glob.glob(r'C:\Users\girim\.gemini\antigravity\brain\**\media__*.png', recursive=True)
files.sort(key=os.path.getctime)

latest_file = files[-1]
dest = r"C:\Users\girim\.gemini\antigravity\scratch\ReactPythonProject\frontend\public\images\jira-operations-board.png"
shutil.copy(latest_file, dest)
print(f"Copied {latest_file} to {dest}")
