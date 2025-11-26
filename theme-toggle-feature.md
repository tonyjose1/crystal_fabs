# Theme Toggle Feature

This document outlines the implementation of the new theme toggle feature, which allows users to switch between a light and dark theme on the website.

## Feature Overview

The theme toggle feature provides a user-friendly way to switch between a light and dark color scheme. The user's preference is saved in local storage, so their selected theme persists across sessions. The default theme is based on the user's system preference.

## Implementation Details

The theme switching functionality is implemented using the `next-themes` library, which is a popular and robust solution for theme management in Next.js applications. The styling is handled by Tailwind CSS's `dark:` variant, which allows for conditional styling based on the active theme.

### Global Styles and Color Inversion (`globals.css`)

The theme toggle will only invert the primary background and text colors between light and dark mode. **All other colors (accent blues, grays, etc.) must remain constant.**

This is achieved by defining two CSS variables that change between themes.

**Note:** This project requires the use of `@import "tailwindcss";`. Do not replace it with `@tailwind base;` directives as this will break the site's styling.

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500;700&display=swap');

/* This import is required for this project's specific setup */
@import "tailwindcss";

/* Define ONLY the colors that will be inverted */
:root {
  --color-background: #FFFFFF; /* Pure White */
  --color-text-primary: #000000; /* Pure Black */
}

.dark {
  --color-background: #000000; /* Pure Black */
  --color-text-primary: #FFFFFF; /* Pure White */
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-roboto);
}
```

### Guidance for Component Styling

*   For main page backgrounds and primary text, use the `bg-background` and `text-text-primary` utility classes. These will now correctly invert.
*   For **all other elements**, use standard, specific color classes (e.g., `bg-gray-100`, `text-gray-500`, `bg-primary`). These colors will not change between light and dark mode, as requested.


### Key Components

*   **`ThemeProvider`**: A new component that wraps the entire application and provides the theme context.
*   **`ThemeToggleButton`**: A new component that renders the theme toggle button in the header.
*   **`tailwind.config.js`**: Updated to enable the `class` strategy for dark mode.
*   **`layout.tsx`**: Updated to wrap the application with the `ThemeProvider`.

### New and Changed Files

**New Files:**

*   `frontend/src/components/ThemeProvider.tsx`: The theme provider component.
*   `frontend/src/components/ThemeToggleButton.tsx`: The theme toggle button component.

**Changed Files:**

*   `frontend/tailwind.config.js`: Enabled the `class` strategy for dark mode.
*   `frontend/src/app/layout.tsx`: Wrapped the application with the `ThemeProvider`.
*   `frontend/src/components/Header.tsx`: Added the `ThemeToggleButton` and updated styling.
*   `frontend/src/components/Hero.tsx`: Updated button styling.
*   `frontend/src/app/HomePageClient.tsx`: Updated section styling.
*   `frontend/src/components/InfoCard.tsx`: Updated component styling.
*   `frontend/src/components/FeatureList.tsx`: Updated component styling.
*   `frontend/src/components/ProductCard.tsx`: Updated component styling.
*   `frontend/src/components/GalleryCard.tsx`: Updated component styling.
*   `frontend/src/components/TestimonialCard.tsx`: Updated component styling.
*   `frontend/src/app/about/page.tsx`: Updated page styling.
*   `frontend/src/components/TeamCard.tsx`: Updated component styling.
*   `frontend/src/app/contact/page.tsx`: Updated page styling.
*   `frontend/src/components/QuoteForm.tsx`: Updated component styling.
*   `frontend/src/app/industries/page.tsx`: Updated page styling.
*   `frontend/src/app/products/page.tsx`: Updated page styling.
*   `frontend/src/app/products/ProductsList.tsx`: Updated component styling.
*   `frontend/src/components/Modal.tsx`: Updated component styling.
*   `frontend/src/app/projects/page.tsx`: Updated page styling.
*   `frontend/src/app/projects/ProjectsList.tsx`: Updated component styling.
*   `frontend/src/app/services/page.tsx`: Updated page styling.
*   `frontend/src/styles/globals.css`: Updated text selection styling.