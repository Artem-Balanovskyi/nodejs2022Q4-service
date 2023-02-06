# Home Library Service
## Installation
1. git clone {https://github.com/Artem-Balanovskyi/nodejs2022Q4-service.git}
2. Switch to develop branch
3. `npm install`
## Running application

```
npm run start
```

```
npm run start:dev
```

```
npm run start:prod
```

```
npm run start:debug
```

## Port

Default port: 4000

## Swagger

http://localhost:4000/doc/

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.