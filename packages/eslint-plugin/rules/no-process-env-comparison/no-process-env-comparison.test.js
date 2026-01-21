const { RuleTester } = require("eslint");

const noProcessEnvComparisonRule = require("./index.js");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020 },
});

ruleTester.run("no-process-env-comparison", noProcessEnvComparisonRule, {
  valid: [
    'if (process.env.NEXT_PUBLIC_SOME_VAR?.trim() === "some-value") {}',
    'if (process.env.NODE_ENV === "production") {}',
    'if (someVar === "production") {}',
    "if (process.env === {}) {}",
  ],
  invalid: [
    {
      code: 'if (process.env.NEXT_PUBLIC_SOME_VAR === "some-value") {}',
      errors: [{ messageId: "avoidDirectEnvComparison" }],
    },
    {
      code: 'if (process.env.NEXT_PUBLIC_SOME_VAR == "some-value") {}',
      errors: [{ messageId: "avoidDirectEnvComparison" }],
    },
    {
      code: 'if (process.env.NEXT_PUBLIC_SOME_VAR > "some-value") {}',
      errors: [{ messageId: "avoidDirectEnvComparison" }],
    },
  ],
});

console.log(">> no-process-env-comparison tests passed");
