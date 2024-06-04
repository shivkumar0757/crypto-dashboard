# Crypto Dashboard

## Overview

Crypto Dashboard is a web application that provides a visual representation of the 24-hour price changes for selected cryptocurrencies. It fetches data dynamically from the Binance public API and displays it in a heatmap format using React.

## Features

- Visualizes 24-hour price changes of selected cryptocurrencies in a heatmap.
- The heatmap's color intensity varies based on the percentage change.
- The application is responsive, built with React and `react-grid-layout`.
- Users can add or remove cryptocurrencies from the heatmap.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine.

# Installation and Running the Application Locally

## Installation

To install the necessary dependencies, follow the steps below:

1. Install backend dependencies:
    ```sh
    cd backend
    npm install
    ```

2. Install frontend dependencies:
    ```sh
    cd ../crypto-dashboard-frontend
    npm install
    ```

## Running the Application Locally

1. Start the backend server:
    ```sh
    cd backend
    node server.js
    ```
    The backend server will start at http://localhost:5000.

2. Start the frontend application:
    ```sh
    cd ../crypto-dashboard-frontend
    npm start
    ```