# Microservices Banking System (With Eureka, API Gateway)

This document explains how to run and manage your distributed banking microservices architecture with **Eureka service discovery** and an **API Gateway**. It highlights features, setup steps, key configuration, and offers placeholders for visual documentation such as screenshots of the Eureka dashboard.

## Project Overview

The system is composed of several Spring Boot microservices and infrastructure modules:

- **account**: Account management service
- **loan**: (If present, Loan management service)
- **greet-service**: Simple greeting service
- **eureka-server**: Eureka Discovery Server (service registry)
- **api-gateway**: API gateway for routing and global filtering

Each service is contained in its own directory and managed independently.

## Shrunken Project Structure

```
/microservices-root
├── account            # Account service (Spring Boot, Eureka client)
├── api-gateway        # API Gateway (Spring Cloud Gateway)
├── eureka-server      # Eureka Discovery Server
├── greet-service      # Greet microservice (Eureka client)
├── README.md          # Project documentation
└── screenshots        # (Insert Eureka dashboard screenshots here)
```

## Features

- **Centralized Service Registry:** All microservices dynamically register with Eureka.
- **API Gateway Routing:** One entry point for all microservices; supports centralized logging, monitoring, and security.
- **Dynamic Discovery:** Service location/ports are handled automatically via Eureka.
- **Global Request Logging:** Custom filters available at the API Gateway layer.
- **Modular Build:** Each microservice is built, run, and scaled independently.

## Service Startup Order

1. **Start Eureka Server**
   - Runs on port 8761.
   - Provides dashboard at `http://localhost:8761`

2. **Start Microservices**
   - Each microservice (account, greet-service) will register with Eureka automatically.

3. **Start API Gateway**
   - Routes all incoming requests to appropriate services by querying Eureka for service instances.

## Example Endpoints via API Gateway

| Service         | Gateway Path                                 | Sample Response                               |
|-----------------|----------------------------------------------|-----------------------------------------------|
| Account         | `/account-service/accounts/{id}`             | `{ "number": "...", "type": "...", ... }`     |
| Greet           | `/greet-service/greet`                       | `"Hello World"`                               |

> **Note:** Service names in URLs must match `spring.application.name` (most often lowercase).

## Placeholders for Eureka Server Screenshots

Insert one or more screenshots showing your Eureka dashboard here to illustrate:

- Microservices registration
- Application status and health info
- Discovery UI interface

*(Example: Eureka dashboard with registered services)*

## Gateway Request Logging

You can implement global logging in the API Gateway using a filter like:

```java
@Component
public class LogFilter implements GlobalFilter {
    @Override
    public Mono filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        System.out.println("Request: " + exchange.getRequest().getURI());
        return chain.filter(exchange);
    }
}
```

Check API Gateway logs to see all incoming requests recorded.

## Summary Table

| Component       | Description                                          |
|-----------------|------------------------------------------------------|
| Service Discovery | Eureka (automatic registration)                   |
| API Entry Point | API Gateway                                         |
| Routing         | Dynamic, Eureka-based                               |
| Service Scaling | By instance, seamless with Eureka                   |
| Central Logging | Via API Gateway filters                             |

## Configuration Highlights

**Eureka Server (application.yml/properties):**
```yaml
server.port: 8761
spring.application.name: eureka-server
eureka.client.fetch-registry: false
eureka.client.register-with-eureka: false
```

**Microservices (e.g., account):**
```yaml
spring.application.name: account-service
eureka.client.service-url.defaultZone: http://localhost:8761/eureka/
```

**API Gateway:**
```yaml
server.port: 9090
spring.application.name: api-gateway
spring.cloud.gateway.discovery.locator.enabled: true
spring.cloud.gateway.discovery.locator.lower-case-service-id: true
eureka.client.service-url.defaultZone: http://localhost:8761/eureka/
```

## Screenshots

*Add captured images of your running Eureka dashboard and service registry below to visually document your system’s health and registration status.*

