# Clinic Hub

Clinic Hub is a web application for managing doctor and patient appointments.

## Features

- User authentication and authorization
- Doctor and patient profiles
- Appointment scheduling
- Appointment reminders
- Patient feedback and ratings

## Tech Stack

- Frontend: Next.js, Tailwind CSS, React Hook Form
- Backend: Node.js, Express.js, PostgreSQL
- API Documentation: Swagger

## Development

### Setup

1. Clone the repository
3. Create a `.env` file with the following variables:
	* `DATABASE_URL`: PostgreSQL database URL
	* `NEXT_PUBLIC_API_URL`: API URL
	* `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key
4. Run the database migration with `npm run db:migrate` or `yarn db:migrate`
5. Start docker container with `docker-compose up --build` or `docker-compose up -d`
6. Optional: Run separately with `npm run dev` or `yarn dev` on each directory

### API Documentation

The API documentation is available at [Postman](https://clinichub.postman.co/workspace/Clinichub-Workspace~b6ca8d8d-b4c1-465c-80e2-585dc4343ff3/request/33819234-fd5c061c-ce7d-430a-9f95-0e4c17209ab2?action=share&creator=39520427&ctx=documentation&active-environment=39520427-a6106596-5502-4dd0-a4d3-e751c8268120).

### Running Tests

To run tests, use `npm run test` or `yarn test`.

## Deployment

The application can be deployed with docker that support Next.js.
