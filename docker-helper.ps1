# Docker Helper Script for Weather Dashboard
# Run this script in PowerShell

Write-Host "Weather Dashboard - Docker Helper Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if Docker is running
function Test-DockerRunning {
    try {
        $result = docker info 2>&1
        return $LASTEXITCODE -eq 0
    } catch {
        return $false
    }
}

# Check Docker status
Write-Host "Checking Docker status..." -ForegroundColor Yellow
if (Test-DockerRunning) {
    Write-Host "✓ Docker is running!" -ForegroundColor Green
    docker --version
    Write-Host ""
} else {
    Write-Host "✗ Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and run this script again." -ForegroundColor Yellow
    exit 1
}

# Menu
while ($true) {
    Write-Host ""
    Write-Host "Select an option:" -ForegroundColor Cyan
    Write-Host "1. Build production image"
    Write-Host "2. Build development image"
    Write-Host "3. Run production container"
    Write-Host "4. Run development container"
    Write-Host "5. Start with Docker Compose (Production)"
    Write-Host "6. Start with Docker Compose (Development)"
    Write-Host "7. Stop all containers"
    Write-Host "8. View running containers"
    Write-Host "9. View container logs"
    Write-Host "10. Clean up (remove containers and images)"
    Write-Host "11. Push to Docker Hub"
    Write-Host "12. Push to GitHub Container Registry"
    Write-Host "0. Exit"
    Write-Host ""
    
    $choice = Read-Host "Enter your choice"
    
    switch ($choice) {
        "1" {
            Write-Host "Building production image..." -ForegroundColor Yellow
            docker build -t weather-dashboard:latest .
        }
        "2" {
            Write-Host "Building development image..." -ForegroundColor Yellow
            docker build -f Dockerfile.dev -t weather-dashboard:dev .
        }
        "3" {
            Write-Host "Running production container..." -ForegroundColor Yellow
            docker run -d -p 8080:80 --name weather-dashboard weather-dashboard:latest
            Write-Host "Container started! Access at http://localhost:8080" -ForegroundColor Green
        }
        "4" {
            Write-Host "Running development container..." -ForegroundColor Yellow
            docker run -d -p 5173:5173 -v ${PWD}:/app -v /app/node_modules --name weather-dashboard-dev weather-dashboard:dev
            Write-Host "Container started! Access at http://localhost:5173" -ForegroundColor Green
        }
        "5" {
            Write-Host "Starting with Docker Compose (Production)..." -ForegroundColor Yellow
            docker-compose up -d
            Write-Host "Services started! Access at http://localhost:8080" -ForegroundColor Green
        }
        "6" {
            Write-Host "Starting with Docker Compose (Development)..." -ForegroundColor Yellow
            docker-compose -f docker-compose.dev.yml up -d
            Write-Host "Services started! Access at http://localhost:5173" -ForegroundColor Green
        }
        "7" {
            Write-Host "Stopping all containers..." -ForegroundColor Yellow
            docker-compose down
            docker-compose -f docker-compose.dev.yml down
            docker stop weather-dashboard weather-dashboard-dev 2>$null
            Write-Host "All containers stopped!" -ForegroundColor Green
        }
        "8" {
            Write-Host "Running containers:" -ForegroundColor Yellow
            docker ps
        }
        "9" {
            $container = Read-Host "Enter container name (weather-dashboard or weather-dashboard-dev)"
            docker logs -f $container
        }
        "10" {
            Write-Host "Cleaning up..." -ForegroundColor Yellow
            docker-compose down
            docker-compose -f docker-compose.dev.yml down
            docker rm -f weather-dashboard weather-dashboard-dev 2>$null
            docker rmi weather-dashboard:latest weather-dashboard:dev 2>$null
            Write-Host "Cleanup complete!" -ForegroundColor Green
        }
        "11" {
            $username = Read-Host "Enter Docker Hub username"
            $version = Read-Host "Enter version tag (e.g., v1.0.0)"
            Write-Host "Tagging image..." -ForegroundColor Yellow
            docker tag weather-dashboard:latest ${username}/weather-dashboard:latest
            docker tag weather-dashboard:latest ${username}/weather-dashboard:${version}
            Write-Host "Pushing to Docker Hub..." -ForegroundColor Yellow
            docker push ${username}/weather-dashboard:latest
            docker push ${username}/weather-dashboard:${version}
        }
        "12" {
            $username = Read-Host "Enter GitHub username"
            Write-Host "Tagging image..." -ForegroundColor Yellow
            docker tag weather-dashboard:latest ghcr.io/${username}/weather-dashboard:latest
            Write-Host "Pushing to GitHub Container Registry..." -ForegroundColor Yellow
            docker push ghcr.io/${username}/weather-dashboard:latest
        }
        "0" {
            Write-Host "Goodbye!" -ForegroundColor Green
            exit 0
        }
        default {
            Write-Host "Invalid choice. Please try again." -ForegroundColor Red
        }
    }
}
