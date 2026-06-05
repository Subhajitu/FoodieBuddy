# FoodieBuddy Implementation Roadmap

This document outlines the step-by-step implementation plan for the FoodieBuddy microservices ecosystem, addressing the gaps identified in the [Assessment Report](./ASSESSMENT_REPORT.md).

---

## Phase 1 – Infrastructure & Dependency Setup
**Objectives:**
- Standardize all services to Spring Boot 3.2.x and Java 17.
- Convert Root POM into a functional Parent POM managing dependencies and plugins.
- Correct Discovery Server configuration (Client → Server).
- Properly configure API Gateway with reactive starters and initial routes.

**Files Affected:**
- Root `pom.xml`
- `discovery-server/pom.xml`, `DiscoveryApplication.java`
- `gateway/pom.xml`, `GatewayApplication.java`, `application.yml`
- All microservice `pom.xml` files

**Risks:**
- Breaking changes between Spring Boot 2.x and 3.x (e.g., `javax` to `jakarta` namespace).
- Dependency version conflicts during standardization.

**Validation Criteria:**
- Project builds successfully with `mvn clean install`.
- Discovery Server UI (8761) is accessible and shows registered services.
- Gateway successfully routes a test request to a registered service.

---

## Phase 2 – Security (Auth & AuthZ)
**Objectives:**
- Centralize user authentication in `user-service`.
- Implement JWT generation, validation, refresh, and logout.
- Configure Gateway to validate JWTs using a Global Filter.
- Secure downstream microservices using Spring Security.

**Files Affected:**
- `user-service`: `WebSecurityConfig.java`, `JwtUtil.java`, `AuthController.java`
- `gateway`: `AuthenticationFilter.java`, `application.yml`
- All services: `SecurityConfig.java`

**Risks:**
- Performance overhead of JWT validation on Every request at the Gateway.
- Complexities in token refresh logic and secure cookie management.

**Validation Criteria:**
- Unauthenticated requests to protected endpoints return 401/403.
- Successful login returns a valid JWT.
- Gateway correctly extracts and validates JWT before routing.

---

## Phase 3 – Restaurant Service
**Objectives:**
- Implement full CRUD for Restaurants and Menu Items.
- Add database persistence with MySQL.
- Separation of concerns: Controller -> Service -> Repository.

**Files Affected:**
- `restaurant-service`: `Restaurant.java`, `Menu.java`, `RestaurantService.java`, `RestaurantController.java`, `RestaurantRepository.java`
- `src/main/resources/db/migration/V1__init_schema.sql`

**Risks:**
- N+1 query problems when fetching menus with restaurants.
- Data consistency between restaurant and order services.

**Validation Criteria:**
- REST endpoints for adding/listing restaurants and menus functional.
- Data persists across service restarts.

---

## Phase 4 – Order Service
**Objectives:**
- Implement Order creation and state management (PENDING, PAID, etc.).
- Integrate with Restaurant Service via OpenFeign or WebClient to validate item availability/prices.
- Implement order tracking endpoints.

**Files Affected:**
- `order-service`: `Order.java`, `OrderService.java`, `OrderController.java`, `RestaurantClient.java`

**Risks:**
- Cascading failures if Restaurant Service is down (Mitigation: Resilience4j Circuit Breaker).
- Distributed data consistency.

**Validation Criteria:**
- Orders can be created only if restaurant/items exist.
- Order status updates reflect in the database.

---

## Phase 5 – Payment Service
**Objectives:**
- Transition from simulation to a persisted Payment model.
- Implement Payment processing API.
- Handle different payment statuses (SUCCESS, FAILED).

**Files Affected:**
- `payment-service`: `Payment.java`, `PaymentRepository.java`, `PaymentService.java`, `PaymentController.java`

**Risks:**
- Security of payment data (Mitigation: Use PCI-compliant placeholders/tokens).
- Handling idempotent payment requests.

**Validation Criteria:**
- Payment records are correctly linked to Order IDs.
- API returns correct payment status.

---

## Phase 6 – Delivery Service
**Objectives:**
- Implement Delivery assignment and tracking logic.
- Integrate with Order and Payment services to trigger delivery upon payment success.

**Files Affected:**
- `delivery-service`: `Delivery.java`, `DeliveryService.java`, `DeliveryController.java`

**Risks:**
- Race conditions in assigning delivery personnel.

**Validation Criteria:**
- Delivery record created automatically after payment.
- Delivery status updates available via REST.

---

## Phase 7 – Saga Orchestration
**Objectives:**
- Implement a Kafka-based Saga (Choreography or Orchestration) for the end-to-end flow: Order Created -> Payment Processed -> Delivery Assigned.
- Implement compensating transactions (e.g., Cancel Order if Payment fails).

**Files Affected:**
- All services: `KafkaConfig.java`, Producers and Listeners in `saga` package.

**Risks:**
- Complexity in debugging distributed event flows.
- Message duplication or out-of-order delivery.

**Validation Criteria:**
- End-to-end flow completes without manual intervention.
- Failures at any step trigger correct rollbacks/cancellations in previous steps.

---

## Phase 8 – Caching (Redis)
**Objectives:**
- Implement Redis caching for frequently accessed, slow-changing data (Restaurant listings, Menus).

**Files Affected:**
- `restaurant-service`: `CacheConfig.java`, `@Cacheable` annotations in Service layer.

**Risks:**
- Stale cache data (Mitigation: Proper TTL and eviction policies).

**Validation Criteria:**
- Significant reduction in response time for cached endpoints.
- Database query count decreases for repeat requests.

---

## Phase 9 – API Documentation
**Objectives:**
- Integrate SpringDoc OpenAPI (Swagger UI) in all services.
- Aggregate all service docs at the Gateway level.

**Files Affected:**
- All services: `pom.xml`, `OpenApiConfig.java`

**Risks:**
- Security of documentation endpoints in production.

**Validation Criteria:**
- Swagger UI accessible at `/swagger-ui.html` for each service and the Gateway.

---

## Phase 10 – Frontend App
**Objectives:**
- Build the UI using Next.js (`foodiebuddy-frontend`).
- Implement Auth flow, Restaurant browsing, and Order placement.
- Use Zustand for state management and React Query for server state.

**Files Affected:**
- `foodiebuddy-frontend/src/**` (components, hooks, services)

**Risks:**
- CORS issues between frontend and Gateway.
- SEO and SSR complexities with Next.js.

**Validation Criteria:**
- Users can login, browse menus, and place orders through the UI.

---

## Phase 11 – Real-Time Tracking
**Objectives:**
- Implement WebSockets (Spring WebSocket + STOMP) or SSE for live order status updates.

**Files Affected:**
- `order-service`: `WebSocketConfig.java`, `NotificationService.java`
- `foodiebuddy-frontend`: WebSocket client implementation.

**Risks:**
- Scaling WebSocket connections across multiple instances.

**Validation Criteria:**
- UI updates order status in real-time without page refresh.

---

## Phase 12 – Testing
**Objectives:**
- Implement Unit tests (JUnit 5, Mockito).
- Implement Integration tests (Testcontainers for MySQL/Kafka).
- Implement E2E tests (Playwright) for critical paths.

**Files Affected:**
- `src/test/java/**` across all services.
- `foodiebuddy-frontend/tests/**`

**Risks:**
- Slow CI pipelines due to heavy integration tests.

**Validation Criteria:**
- 70%+ Code Coverage.
- All tests pass in CI environment.

---

## Phase 13 – Containerization
**Objectives:**
- Optimize Dockerfiles (Multi-stage builds, JRE-only base images).
- Update `docker-compose.yml` to include Next.js frontend and healthchecks.

**Files Affected:**
- All `Dockerfile`s
- `docker-compose.yml`

**Risks:**
- Large image sizes affecting deployment speed.

**Validation Criteria:**
- `docker-compose up` starts the entire ecosystem successfully.
- Images are under 300MB for Java services.

---

## Phase 14 – CI/CD Pipelines
**Objectives:**
- Set up GitHub Actions for:
    - PR validation (Build & Test).
    - Image push to Registry (Docker Hub/ECR) on merge to main.

**Files Affected:**
- `.github/workflows/*.yml`

**Risks:**
- Secret management for Docker/Cloud credentials.

**Validation Criteria:**
- Every PR is automatically tested.
- Merges to `main` trigger image builds and pushes.

---

## Phase 15 – Observability
**Objectives:**
- Add Spring Boot Actuator to all services.
- Implement Distributed Tracing (Micrometer Tracing + Zipkin/Tempo).
- Set up Prometheus/Grafana for metrics dashboarding.

**Files Affected:**
- All services: `pom.xml`, `application.properties`

**Risks:**
- Overhead of tracing and logging on high-traffic services.

**Validation Criteria:**
- Single trace spans multiple services in Zipkin.
- Dashboard shows real-time request rates and error counts.

---

## Phase 16 – Cloud Deployment
**Objectives:**
- Provision AWS infrastructure (RDS for MySQL, MSK for Kafka, EKS/ECS for services).
- Configure Load Balancer and Route53.

**Files Affected:**
- Terraform/CloudFormation templates (to be created).

**Risks:**
- Complexity of VPC networking and IAM roles.
- Costs associated with cloud resources.

**Validation Criteria:**
- Application is accessible via a public URL.
- High availability (multi-AZ) is verified.
