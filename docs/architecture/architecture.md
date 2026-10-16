## Architecture Document: Unnamed App

1. Architectural Principles & Core Patterns

This architecture document outlines the technical blueprint for this mobile application. Built for a single-engineer workflow, the system relies on three foundational software design patterns to ensure high testability, strict decoupling, and zero infrastructure cost:

Feature-First Modular Architecture: Code is organized by business domain features (goals, coach, analytics, sync) rather than technical layers (components, screens, services), keeping related logic self-contained.

Clean Architecture (Layered Boundaries): Strict inward dependency rules separating the Domain / Business Rules from external frameworks, UI, and storage mechanisms.

Ports and Adapters (Hexagonal Architecture): Core business logic interacts with external systems (LLM APIs, local databases, cloud sync) strictly through defined interfaces (Ports), implemented via concrete classes (Adapters).

---

2. High Level Folder Structure

```
src
    - app
        - contexts
        - features
            - presenters
            - domain
                - service
                - repo
            - screen
        - hooks
        - navigators
    - modules
    - platform
    - shared
    - ui-kit
    - composition -> dependency injection
```

---

3. Flow

For features the interaction flow would be like this

    Screen
     |
    Presenter
     |
    Service
     |     |
    Repo   Platform
     |
    modules

---
