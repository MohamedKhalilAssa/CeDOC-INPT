# CeDoc - Backend

Welcome to the backend of **CeDoc INPT** , a Spring Boot-powered API that handles business logic for PHD Candidates - INPT.

---

## 📦 Project Structure

This backend is built with **Spring Boot** and structured around modern security practices, including JWT authentication, secure cookie handling, and email verification for account validation.

---

## 🚀 Getting Started

To get the backend server running locally:

### 1. Setup Configuration

You have two options:

- **Option A:** Run the setup script :
  ```bash
  ./setup.sh
  ```

- **Option B:** Manually configure secrets:
  - Copy the example config:
    ```bash
    cp src/main/resources/application-secrets.properties.example src/main/resources/application-secrets.properties
    ```
  - Fill in the required environment secrets (e.g., DB password, JWT secrets, email tokens).

---

## 🔐 Authentication Endpoints (`/api/auth`)

| Method | Endpoint                          | Description                                                      |
|--------|-----------------------------------|------------------------------------------------------------------|
| POST   | `/register`                       | Register a new user                                              |
| POST   | `/login`                          | Authenticate user and return tokens  (account must be validated) |
| POST   | `/logout`                         | Logs out the user and clears auth cookies (must be authenticated)|
| POST   | `/refresh-token`                  | Refresh JWT using secure refresh token cookie                    |
| POST   | `/email/send-verification`        | Sends a verification email to user                               |
| POST   | `/email/verify`                   | Verifies user's email using token and email                      |

---

## 🛠️ Tech Stack

- Java 17+
- Spring Boot 3+
- Spring Security & JWT
- Hibernate & JPA
- MySQL Or PostgresSQL - REDIS 
- Lombok
- Jakarta Validation
- Maven

---

## 📁 Static Resources

static assets like the logo are placed in:
```
src/main/resources/static/
```
Spring Boot will serve these automatically at `/`.

---

## 📌 Notes

- JWT refresh tokens are stored and retrieved via **cookies**.
- User entity implements `UserDetails` to integrate seamlessly with Spring Security.
- Email verification runs asynchronously using `CompletableFuture`.

---

## ➕ To Be Added

- Documentation of endpoints in Swagger (TBD)
- Admin and user management APIs
- Protected routes with role-based access

---
## 📄 License  
This project is internal to the CeDoc platform and is not currently licensed for public distribution.
---

