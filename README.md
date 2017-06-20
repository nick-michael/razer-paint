# Razer Paint
<img src="https://ci.appveyor.com/api/projects/status/y9esx9gjo3v8nrre/branch/master?svg=true" alt="Project Badge" width="200">

An application to paint and animate Razer Chroma keyboards, build on electron.

## Running The Application
- `npm start` - Builds, watches, and starts the application in the development environment
- `npm run start:electron` - Starts electron pointing to the currently built application
- `npm run build:webapp:prod` - Builds the web application in the production environment
- `pack` - Builds the electron application as a `.exe` file
- `build:win` - Builds the electron applicaition as a `.exe` file and compiles a windows installer
- `npm run lint` - Runs eslint
- `npm run lint:fix` - Runs eslint with the fix flag
- `npm run test` - Runs the unit tests
- `npm run coverage-report` - Creates a coverage report in the `/coverage` directory (Must be run after the unit tests)