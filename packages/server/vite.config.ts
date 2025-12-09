import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    reporters: ["default", "github-actions"],
    coverage: {
      provider: "v8", // provider
      reporter: ["text", "json", "json-summary", "html"], // report format
      reportOnFailure: true, // report coverage even if fails
      include: ["src/**"],
      exclude: ["**/types/**", "**/constants/**"],
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
    },
  },
});
