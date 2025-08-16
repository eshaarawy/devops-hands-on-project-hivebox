# HiveBox — DevOps Hands-On Implementation

HiveBox is a hands-on project designed to walk through the **Software Development Life Cycle (SDLC)** with a strong focus on **DevOps practices**.  
This repository documents my implementation of the project, highlighting the tools and practices I applied.

---

## 🔹 Core Application
- Developed a minimal REST API with **Node.js** exposing:
  - `/version` → returns the current application version.
  - `/temperature` → fetches environmental data (average temperature from selected senseBoxes).
  - `/metrics` → provides default **Prometheus metrics** for monitoring.
- Containerized the application using **Docker** for consistent builds and deployments.

---

## 🔹 Testing & Code Quality
- Integrated **ESLint** for static code analysis and coding standards.
- Wrote **unit tests** covering:
  - `/version` endpoint response.
  - `/temperature` logic (average calculation + API fallback).
- Automated testing via CI workflows.
- Applied **Hadolint** to enforce best practices in the `Dockerfile`.

---

## 🔹 CI/CD with GitHub Actions
- Implemented GitHub Actions workflows for:
  - **Linting**: Run ESLint on code and Hadolint on the Dockerfile.
  - **Testing**: Execute all unit tests on every push and pull request.
  - **Build**: Build and validate the Docker image.

---

## 🔹 Kubernetes & Infrastructure
- Defined **Kubernetes manifests** for:
  - Deployment
  - Service
  - Ingress
- Ensured containerized app could be deployed and accessed via Kubernetes.

---

## 🔹 Infrastructure as Code (IaC)
- Provisioned Kubernetes clusters using **Terraform**.
- **AWS provider** `→ 5.37.0`, region: `us-east-1`
- **AWS EKS** (v1.30) via `eks/aws → 19.17.2`  
- **VPC** via `vpc/aws → 5.1.2` (private/public subnets, NAT, DNS)  

---

## 🛠️ Tools & Technologies Used
- **Language & Framework**: Node.js  
- **Version Control**: GitHub  
- **CI/CD**: GitHub Actions  
- **Containers & Orchestration**: Docker, Kubernetes  
- **Infrastructure as Code**: Terraform  
- **Observability**: Prometheus metrics  

---