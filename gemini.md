# Gemini Assistant Log

This file logs the thought process, commands, and actions taken by the Gemini assistant during the development of the Crystal Fabs website.

## Phase 1: Foundation and Initial Setup

- **Objective:** To build a modern, responsive, and visually appealing website with a full-featured frontend and a robust backend.
- **Key Activities:**
  - Set up the project structure with a Next.js frontend and an Express.js backend.
  - Configured the database with PostgreSQL and Prisma.
  - Developed a component-based frontend with a custom theme, animations, and responsive design.
  - Integrated the frontend with the backend to fetch live data and submit forms.
- **Challenges:**
  - Encountered and resolved several configuration issues with Node.js modules and Tailwind CSS.
  - Debugged and fixed errors related to dependency management and build processes.
- **Outcome:** Successfully completed Phase 1, resulting in a functional and visually appealing website.

## Phase 2: Learning and Refinement

- **Objective:** To improve the development process and avoid repeating mistakes.
- **Key Learnings:**
  - **Structural Changes:** When making structural changes, such as modifying the API response format, it is crucial to apply these changes broadly across the entire application. A change in one part of the application, like the products page, should be reflected in other similar parts, like the projects and testimonials pages. This will prevent inconsistencies and errors.
  - **Thoroughness:** It is essential to be thorough and proactive in identifying and fixing all instances of an error across the application, instead of just fixing the one that is reported.
  - **Communication:** It is important to communicate clearly and professionally, and to avoid making excuses or being overly apologetic. Taking ownership of mistakes and focusing on providing solutions is the best way to build trust and confidence.
  - **Data Models:** It is important to have a clear understanding of the data models before implementing features. For example, the `Project` model has a `category` field which is a `String`, not a relation to the `Category` model. This means that project categories are not managed as separate entities and can be added directly when creating or editing a project.

## Phase 3: Tooling and Bug Fixes

- **Objective:** To improve code quality, implement a testing framework, and resolve existing bugs.
- **Key Activities:**
  - **Linting:** Set up ESLint for both the frontend and backend to enforce code style and catch errors early.
  - **Testing:** Implemented Jest and React Testing Library for the frontend, and Jest with Supertest for the backend to create a robust testing framework.
  - **Bug Fixes:** Addressed several bugs, including hydration errors in Next.js, incorrect data handling on the products and projects pages, and type errors in the contact and quote forms.
  - **UI Improvements:** Enhanced the user experience by improving the styling of the file input in the quote form.
- **Outcome:** A more stable and maintainable codebase with a solid foundation for future development.


## Phase 4: Development Protocol for New Features or Tasks

- **Objective:** To ensure that every new feature or task is thoroughly understood, carefully planned, and properly documented before and after implementation.

- **Guideline:**
    Whenever a new feature or task is assigned, the first step must always be complete analysis. Take as much time as required to understand the feature from every angle before starting any coding work.

    The analysis should include:

    What the feature is intended to do and why it is needed.

    Which files, components, and modules will be affected.

    What changes are required in data models, APIs, or endpoints.

    The expected UI and UX changes, including how they will affect user interactions.

    The impact on the overall user flow and any possible side effects.

    Edge cases and potential failure scenarios.

    Any dependencies, integrations, or configurations that need to be considered.

    The goal is to have complete clarity before implementation starts. Mistakes are acceptable; repeating the same mistakes because of incomplete analysis is not.

- **Process:**

    Perform a full analysis and document all findings clearly.

    Review the analysis and ensure all potential issues have been considered.

    Wait for explicit approval before starting any implementation.

    Once approval is received, implement the feature exactly as planned.

    If unexpected issues arise during development, pause, re-analyse, and confirm the updated plan before continuing.

    After implementing a new feature, create a dedicated markdown (.md) file explaining the complete feature.
    This document must include:

    A summary of the feature and its purpose.

    A list of all files created or modified.

    A description of the logic, components, and flow added or changed.

    Notes on any dependencies, configurations, or environment variables introduced.

    Any relevant testing instructions or considerations for future maintenance.

- **Outcome:**
  A development process where every feature is analysed before coding, implemented with precision, and documented clearly afterward. No repeated mistakes, no unnecessary rework, and no missing context for future developers.

- never try to communicate using shell command
