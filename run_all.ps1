# run_all.ps1 — Start both backend and frontend

Write-Host "Starting Anoryx e-Office Suite..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\Backend'; if (-Not (Test-Path 'venv')) { python -m venv venv }; .\venv\Scripts\Activate.ps1; pip install -r requirements.txt -q; python app.py"

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; if (-Not (Test-Path 'node_modules')) { npm install }; npm run dev"

Write-Host "Frontend -> http://localhost:5173" -ForegroundColor Green
Write-Host "Backend  -> http://localhost:5000" -ForegroundColor Green
Write-Host "Ensure MongoDB is running on localhost:27017" -ForegroundColor Yellow
