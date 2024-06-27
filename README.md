# magic transporters task

This is a simple Express application with TypeScript and Prisma.

## Prerequisites

- Node.js
- npm
- SQLite with Prisma

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone hhttps://github.com/JooZef315/Magic-Transporters-task.git
cd your-repo
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Set up the environment variables:

```bash
DATABASE_URL="file:./magicTransporters.db"
```

### Database Setup

```bash
npm run db:push
```

### Start the application:

```bash
npm run dev
```

The server will start on http://localhost:3001.

## Usage

### API Endpoints

- **POST /movers**: to add a magic Mover.
- **POST /items**: to add a magic Item.
- **PATCH /mission/load**: to load a mover with an item.
- **PATCH /mission/start**: to start a Mission.
- **PATCH /mission/end**: to end/compelte a Mission.
- **GET /movers/top**: to get movers who completed the most missions..

## Logging

The application uses Winston for logging. Logs are written to **magicTransporters.log** and rotated after reaching 10MB in size.

## Custom Error Handling

Custom errors are handled using the CustomError class, which sends appropriate HTTP status codes and error messages.
