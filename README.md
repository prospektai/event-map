# Event Map - React Frontend

## Project Summary
Event Map is a dynamic React application designed to visualize and track events on an interactive map. Users can browse events by category, search by keywords, filter by date ranges, and track events of interest.

## Features
- **Interactive Map:** Displays event locations using Leaflet.js and marker clustering.
- **Event Listing:** View a comprehensive list of events with detailed information.
- **Search & Filter:** Search events by title/description, filter by categories (e.g., Yoga, Music, Conference), and date ranges.
- **Event Tracking:** Users can "track" events to easily find them later.
- **Responsive Design:** Optimized for various screen sizes.

## Setup
To set up the project locally, ensure you have Node.js (v20 or higher) and Yarn installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prospektai/event-map.git
    cd event-map
    ```
2.  **Install dependencies:**
    ```bash
    yarn install
    ```

## Quick Start Guide

### Development Environment (using Docker Compose)
To run the application in a development Docker container:

1.  **Build and run the development container:**
    ```bash
    docker compose --profile dev up -d --build
    ```
2.  **Access the application:**
    Open your browser and navigate to `http://localhost:5173`. The application will automatically reload on code changes.

### Production Environment (using Docker Compose)
To build and run the application in a production-ready Docker container (served by Nginx):

1.  **Build and run the production container:**
    ```bash
    docker compose --profile prod up -d --build
    ```
2.  **Access the application:**
    Open your browser and navigate to `http://localhost:80`.

### Local Development (without Docker)
To run the application locally without Docker:

1.  **Start the development server:**
    ```bash
    yarn dev
    ```
2.  **Access the application:**
    Open your browser and navigate to `http://localhost:5173`.

## License
This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it.
(Note: Third-party libraries and icons used within this project may have their own respective licenses.)
