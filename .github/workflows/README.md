GitHub Actions CI/CD Pipeline
This directory contains the GitHub Actions workflow for the Tic Tac Toe application's CI/CD pipeline.

Pipeline Stages
The CI/CD pipeline consists of the following stages:

Unit Testing - Runs the test suite using Vitest
Static Code Analysis - Performs linting with ESLint
Build - Creates a production build of the application
Docker Image Creation - Builds a Docker image using a multi-stage Dockerfile
Docker Image Scan - Scans the image for vulnerabilities using Trivy
Docker Image Push - Pushes the image to GitHub Container Registry
Update Kubernetes Deployment - Updates the Kubernetes deployment file with the new image tag
How the Kubernetes Deployment Update Works
The "Update Kubernetes Deployment" stage:

Runs only on pushes to the main branch
Uses a shell script to update the image reference in the Kubernetes deployment file
Commits and pushes the updated deployment file back to the repository
This ensures that the Kubernetes manifest always references the latest image
Required Secrets
The workflow requires the following GitHub secrets:

GITHUB_TOKEN - Automatically provided by GitHub Actions, used for pushing to the repository and the container registry
Continuous Deployment
For full continuous deployment, you would need to:

Set up a Kubernetes operator like Flux or ArgoCD to watch for changes in the repository
Configure it to automatically apply changes to the Kubernetes manifests
This would complete the CI/CD pipeline by automatically deploying the new image to your Kubernetes cluster
Manual Deployment
If you're not using a GitOps approach with an operator, you can manually apply the updated deployment:

kubectl apply -f kubernetes/deployment.yaml
Or set up a webhook to trigger the deployment when the manifest is updated.
