# NestJS PDF Export with BullMQ

## Description

A NestJS application demonstrating PDF export functionality using BullMQ for job processing. The application manages cat records and can generate PDF reports. No external database is needed.

## Features

- PDF export functionality using Puppeteer
- Queue-based job processing with BullMQ
- Handlebars templating for PDF generation

## Installation

```bash
npm install
```

## Running the app

1. Start Redis:

```bash
npm run start:docker
```

2. Run the application:

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

- `GET /cats` - Get all cats
- `POST /cats` - Create a new cat
- `POST /cats/export` - Export selected cats to PDF public folder.
