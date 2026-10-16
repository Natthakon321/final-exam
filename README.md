# Software Testing Final Exam

This project contains automated tests for SauceDemo using Playwright and TypeScript.

## Requirements

- Node.js
- npm
- Playwright
- TypeScript

## Installation

Install project dependencies:

```bash
npm install
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in Chromium:

```bash
npx playwright test --project=chromium
```

## Test Cases

### Unit Testing

**UT-01: Login Form Validation**
- UT-01.1: Verify the error message when username and password are empty.
- UT-01.2: Verify the error message when the password is missing.
- UT-01.3: Verify the error message when invalid credentials are provided.

**UT-02: Product Button State**
- Verify that the Add to cart button changes to Remove.
- Verify that the cart badge updates when a product is added.
- Verify that the product can be removed from the cart.

### Integration Testing

**IT-01: Top-down Integration Testing with Stub**
- Verify the mock inventory interface using a stub.

**IT-02: Bottom-up Integration Testing with Driver**
- Simulate access to the inventory page.
- Verify that two products can be added to the cart.

### System Testing

**ST-01: Complete Purchase**
- Complete a purchase of Backpack and Bike Light.
- Verify the successful order confirmation.

**ST-02: Checkout Validation**
- Verify required-field validation during checkout.
- Complete the purchase after entering valid information.

## Test Results

The latest test run completed with the following results:

- Total test cases: 8
- Passed: 8
- Failed: 0
- Browser: Chromium

## Reports

The HTML report is generated in the `playwright-report` directory.

Open the HTML report using:

```bash
npx playwright show-report
```

The JSON report is available at:

`reports/results.json`

The test summary is available at:

`reports/test-summary.md`

## Notes

- IT-01 uses a mock inventory interface to demonstrate stub-based testing.
- IT-02 uses a simulated session cookie to demonstrate driver-based testing.
- These integration tests demonstrate simplified testing scenarios and do not represent a complete production authentication integration.