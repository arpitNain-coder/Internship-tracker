# Internship Tracker

Internship Tracker is a full-stack web application designed to make internship discovery simpler and more organized.

Instead of searching through multiple internship platforms individually, the application collects internship opportunities from different sources and brings them together in a single, centralized interface. Users can browse available opportunities, view important details such as company, role, location, and source, and directly access the original internship listing.

## Overview

Finding relevant internships often requires checking multiple platforms, filtering through repetitive listings, and switching between different websites.

Internship Tracker addresses this problem by automating the collection of internship opportunities and presenting them through a clean and unified interface.

The application consists of a React frontend, an Express/Node.js backend, and a MongoDB database. The backend is responsible for collecting and managing internship data, while the frontend consumes the backend API and displays the opportunities to users.

## Features

- Collects internship opportunities from multiple platforms
- Centralizes internship listings in one place
- Displays company, job title, location, and source
- Provides direct links to the original internship listing
- Automatically stores internship data in MongoDB
- REST API for retrieving internship opportunities
- Responsive and modern user interface
- Automated data collection through backend scrapers
- Prevents duplicate listings using database constraints

## How It Works

The application follows a simple data flow:

1. Internship data is collected from external platforms through backend scrapers.
2. The backend processes and stores the collected data in MongoDB.
3. The Express server exposes the stored internships through a REST API.
4. The React frontend requests the internship data from the API.
5. The frontend displays the opportunities as interactive internship cards.
6. Users can open the original listing through the provided Apply link.

## Things To Work On:
THe application falls short at many cases:
1. Ui for internships is bad design is good but internship data presentation is bad.
2. First backend is to be started manually to get internship data on frontend.
3. Backend itself is finalized and gives all information from links to location its just frontend which has some errors.
```text
External Internship Platforms
            │
            ▼
      Backend Scrapers
            │
            ▼
        Node.js / Express
            │
            ▼
       MongoDB Atlas
            │
            ▼
       REST API
            │
            ▼
      React + Vite
            │
            ▼
          User
