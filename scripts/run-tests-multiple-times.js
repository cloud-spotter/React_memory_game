// There were some inconsistent results from tests during some parts of development
// Introduced this script to add option to run tests multiple times, to mitigate 'test flakiness' obscuring performance

const { execSync } = require('child_process');

const numberOfRuns = 5; // Modify as needed

for (let i = 0; i < numberOfRuns; i++) {
  console.log(`\nTest run ${i + 1} of ${numberOfRuns}`);
  try {
    // Run the tests once and then exit, rather than staying in watch mode
    execSync('npm test -- --watchAll=false', { stdio: 'inherit' });
  } catch (error) {
    console.error(`Test run ${i + 1} failed`);
    process.exit(1); // Exit with error code if any test run fails
  }
}

console.log('\nAll test runs completed successfully');

// Run this script with command 'npm run test:repeated'
// Running the usual 'npm test' is still available too