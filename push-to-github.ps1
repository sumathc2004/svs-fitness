# Push SVS Fitness to your GitHub Repository

$gitExe = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $gitExe)) {
    $gitExe = "git"
}

cd "c:\Users\HP\Desktop\web development\gym-portal"

Write-Host "Initializing Git Repository..." -ForegroundColor Cyan
& $gitExe init
& $gitExe add .
& $gitExe commit -m "Initial commit for SVS Fitness Full-Stack Portal"
& $gitExe branch -M main

Write-Host "`nReady to push!" -ForegroundColor Green
Write-Host "Run the following commands with your repository URL:" -ForegroundColor Yellow
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/svs-fitness.git"
Write-Host "git push -u origin main"

