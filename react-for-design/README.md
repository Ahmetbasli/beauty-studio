# Beauty Studio - UI Design Project

## Project Overview

This project is specifically focused on creating a beautiful, modern, and user-friendly UI design for a beauty service booking platform. The primary goal is to showcase UI/UX design principles and implementation, without backend functionality.

## Design Objectives

- Create a luxury, modern interface for beauty service bookings
- Implement mobile-first, responsive design
- Showcase smooth animations and transitions
- Demonstrate modern UI patterns and best practices

## Features (UI Only)

### User Flow

1. **Role Selection**: Choose between Beauty Artist or Customer
2. **Google Authentication**: Simple and secure sign-in process
3. **Profile Creation**: Role-specific registration forms
4. **Service Browsing**: Discover beauty services and artists
5. **Booking Management**: View and manage appointments

## Pages

- `/` - Role Selection Page

  - Initial landing page
  - Choose between Beauty Artist or Customer
  - Step 1 of the registration process

- `/signup` - Google Sign-in Page

  - Google authentication
  - Step 2 of the registration process
  - Simplified sign-in experience

- `/register` - Profile Completion Page

  - Role-specific registration forms
  - Step 3 of the registration process
  - Different fields for artists and customers

- `/login` - Login Page

  - Quick Google sign-in for returning users
  - Direct access to the platform

- `/home` - Home Page

  - Browse beauty services
  - View featured artists
  - Quick booking options

- `/artist/:id` - Artist Detail Page
  - Artist profile and portfolio
  - Service offerings
  - Booking interface

## Tech Stack

- React
- Tailwind CSS
- Framer Motion (for animations)
- Shadcn UI Components
- Lucide Icons

## Important Note

This is a UI-only implementation. All data is mocked and no actual backend integration is included. The project serves as a design reference and UI prototype.

## Design Principles

- Luxury and premium feel
- Clean and minimalist aesthetics
- Intuitive navigation
- Smooth animations
- Consistent color scheme and typography

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Design Assets

- Color Scheme: Gold and soft pink theme
- Typography: Poppins font family
- Icons: Lucide icon set
- Animations: Framer Motion library
- Components: Shadcn UI
