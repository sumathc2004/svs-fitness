# One-Click Push Script for SVS Fitness to GitHub

$gitExe = "c:\Users\HP\Desktop\web development\mingit\cmd\git.exe"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " PUSHING SVS FITNESS TO GITHUB..." -ForegroundColor Yellow
Write-Host " Repository: https://github.com/sumathc2004/svs-fitness.git" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

& $gitExe remote remove origin 2>$null
& $gitExe remote add origin https://github.com/sumathc2004/svs-fitness.git
& $gitExe branch -M main

Write-Host "`nRunning push... If prompted, please click 'Sign in with your browser'!" -ForegroundColor Green
& $gitExe push -u origin main
