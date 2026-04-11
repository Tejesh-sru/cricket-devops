# cricket-devops

## CI / CD and Deployment

This repository contains GitHub Actions workflows that build and publish Docker images for the frontend and backend.

Required repository secrets (Repository settings → Secrets):

- `DOCKERHUB_USERNAME` — Docker Hub username (optional; when set, images are pushed to Docker Hub)
- `DOCKERHUB_TOKEN` — Docker Hub access token (recommended over password)

Workflows added:
- `.github/workflows/docker-image.yml` — builds and pushes images to GHCR and Docker Hub (push to Docker Hub only when Docker Hub secrets are set)
- `Criconnnect/.github/workflows/ci-cd.yml` — project-specific CI that builds/pushes images for the `Criconnnect` app
- `Criconnnect/.github/workflows/deploy.yml` — builds and deploys `frontend` to GitHub Pages

Pull the built images (examples):

```bash
# GitHub Container Registry
docker pull ghcr.io/<your-org-or-username>/cricket-backend:latest
docker pull ghcr.io/<your-org-or-username>/cricket-frontend:latest

# Docker Hub (if pushed)
docker pull <your-dockerhub-username>/cricket-backend:latest
docker pull <your-dockerhub-username>/cricket-frontend:latest
```

To run locally (build):

```bash
docker build -t local-cricket-backend -f Criconnnect/backend/Dockerfile Criconnnect/backend
docker build -t local-cricket-frontend -f Criconnnect/frontend/Dockerfile Criconnnect/frontend
```
