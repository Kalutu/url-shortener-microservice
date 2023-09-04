# URL Shortening API
This URL Shortening API allows you to convert long URLs into shorter, more manageable links. It uses Express for handling HTTP requests and MongoDB for storing the original and shortened URLs.

## Features
- Shorten long URLs into short, unique identifiers.
- Redirect users to the original URL when they access the shortened link.
- Validate URLs to ensure they are in the correct format.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- Environment variables configured

## API Endpoints

### `GET /api/hello`
Returns a greeting JSON object.

### `POST /api/shorturl`
Shortens a URL and returns the original and shortened URLs.

### `GET /api/shorturl/:input`
Redirects users to the original URL based on the shortened input.

## Database
The API uses MongoDB to store original URLs and their corresponding short identifiers. The `URL` schema includes fields for `original` and `short`.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub fork and pull request workflow.
