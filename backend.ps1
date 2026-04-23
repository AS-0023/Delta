Set-Location Backend
if (!(Test-Path venv)) {
    Write-Host 'Creating virtual environment...'
    if (Get-Command python -ErrorAction SilentlyContinue) { python -m venv venv }
    elseif (Get-Command py -ErrorAction SilentlyContinue) { py -m venv venv }
    else { Write-Error 'Python not found. Please install Python.'; exit 1 }
    .\venv\Scripts\pip install flask flask-cors python-dotenv
}
Write-Host 'Starting Backend... venv activated'
.\venv\Scripts\python app.py
