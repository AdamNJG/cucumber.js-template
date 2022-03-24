let common = [
    'cucumber/features/**/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load TypeScript module
    '--require cucumber/features/step_definitions/*.ts',   // Load step definitions
    '--format progress-bar',    
    '--publish'            
  ].join(' ');

module.exports = {
    default: common
  }