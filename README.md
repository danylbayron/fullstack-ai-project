# ![RealWorld Example App](logo.png)

> ### NEXT and NEST codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://demo.realworld.build/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **NEXT and NEST** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **NEXT and NEST** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

> Describe the general architecture of your app here

## Frontend Architecture

- **Principles:** SOLID principles guide our code structure and development practices.
- **Structure:** Follows a modular, resource-based pattern inspired by NestJS. Each resource/page has its own directory containing components, hooks, and API logic.
- **Shared Code:** Common functionality is placed in a `shared` folder.
- **Naming Convention:** All files and folders use dash-case (e.g., `dash-case`) for consistency and readability.

## Backend Architecture

- **Principles:** Implements SOLID principles to ensure maintainable and scalable code.
- **Structure:** Organized into modules, each representing a resource, following NestJS best practices.
- **Shared Code:** Shared logic and utilities are grouped in appropriately named shared modules.
- **Naming Convention:** Uses dash-case (e.g., `dash-case`) for all file and directory names, ensuring uniformity throughout the backend.

# Getting started

> npm install, npm start, etc.

# Tech Stack

## Backend

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/)

## Frontend

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Bootstrap](https://getbootstrap.com/)

This architecture provides a robust, modular backend using NestJS and PostgreSQL, with scalable data modeling via TypeORM and secure authentication through JWT. The frontend leverages Next.js for server-side rendered React, styled efficiently with Bootstrap.
