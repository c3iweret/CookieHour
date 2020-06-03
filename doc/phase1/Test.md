# Test.md

## Testing Method to be employed: TDD (Test Driven Development) and BDD (Behavior Driven Development)

### We will be performing unit tests as well as integrated tests.

#### Libraries we will use:

- React Testing Library - Frontend
- Jest - Frontend
- Chai - Backend
- Mocha - Backend

#### Process
- For every user story, tests shall be written to fail initially, and then pass after the user story is completed
- Tests shall be written by the developer assigned to that user story.
- The following process will be followed regarding testing:
  - 1. Add a test
  - 2. Run all tests and make sure the new one you just added fails
  - 3. Write some code
  - 4. Run Tests
  - 5. Refactor code until all tests pass
  - 6. Repeat
- Where to find testing framework:
  - In the "src/components" folder
  - Every component will have a corresponding test file
  - Each test will have a "describe", "it", and "expect" statement

##### Continuous Integration:
- For continuous integration, we will be making use of Travis and running our test suite on every commit
- A pull request will only be merged into the master branch if it passes all tests
