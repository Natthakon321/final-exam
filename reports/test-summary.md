# Test Summary — Software Testing Final Exam

## Test Execution Summary

- Total Test Cases: 8
- Passed: 8
- Failed: 0
- Flaky: 0
- Skipped: 0
- Browser: Chromium
- Test Framework: Playwright
- Programming Language: TypeScript
- Target Website: https://www.saucedemo.com/

## Test Cases

### Unit Testing
- UT-01.1: Empty username and password
- UT-01.2: Missing password
- UT-01.3: Invalid credentials
- UT-02: Product Button State

### Integration Testing
- IT-01: Top-down Integration Testing with Stub
- IT-02: Bottom-up Integration Testing with Driver

### System Testing
- ST-01: Complete Purchase
- ST-02: Checkout Validation

## Execution Command

```bash
npx playwright test
```

## HTML Report

```bash
npx playwright show-report
```