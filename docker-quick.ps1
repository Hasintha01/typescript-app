# Docker Helper Script - Quick Commands
# Run with: .\docker-quick.ps1

param(
    [string]$Action = "help"
)

# Load environment variables from .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)\s*=\s*(.*)') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

switch ($Action) {
    "build" {
        Write-Host "Building Docker image with API key..." -ForegroundColor Cyan
        $apiKey = $env:VITE_WEATHER_API_KEY
        docker build --build-arg VITE_WEATHER_API_KEY=$apiKey -t typescript-app:latest .
    }
    "run" {
        Write-Host "Running container on port 3000..." -ForegroundColor Cyan
        docker run -d -p 3000:80 --name typescript-app-test typescript-app:latest
        Write-Host "App running at http://localhost:3000" -ForegroundColor Green
    }
    "stop" {
        Write-Host "Stopping container..." -ForegroundColor Yellow
        docker stop typescript-app-test
        docker rm typescript-app-test
    }
    "rebuild" {
        Write-Host "Rebuilding and restarting..." -ForegroundColor Cyan
        docker stop typescript-app-test 2>$null
        docker rm typescript-app-test 2>$null
        $apiKey = $env:VITE_WEATHER_API_KEY
        docker build --build-arg VITE_WEATHER_API_KEY=$apiKey -t typescript-app:latest .
        docker run -d -p 3000:80 --name typescript-app-test typescript-app:latest
        Write-Host "App running at http://localhost:3000" -ForegroundColor Green
    }
    "logs" {
        docker logs -f typescript-app-test
    }
    "compose-up" {
        Write-Host "Starting with Docker Compose..." -ForegroundColor Cyan
        docker-compose up -d
        Write-Host "App running at http://localhost:8080" -ForegroundColor Green
    }
    "compose-down" {
        docker-compose down
    }
    default {
        Write-Host @"
Docker Quick Commands:
  .\docker-quick.ps1 build         - Build the Docker image
  .\docker-quick.ps1 run           - Run the container
  .\docker-quick.ps1 stop          - Stop and remove container
  .\docker-quick.ps1 rebuild       - Rebuild and restart
  .\docker-quick.ps1 logs          - View container logs
  .\docker-quick.ps1 compose-up    - Start with docker-compose
  .\docker-quick.ps1 compose-down  - Stop docker-compose
"@ -ForegroundColor Yellow
    }
}
