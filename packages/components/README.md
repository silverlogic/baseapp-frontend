# **`@baseapp-frontend/components`**

## **Overview**

This package includes BaseApp components.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/components
# or
yarn add @baseapp-frontend/components
# or
pnpm install @baseapp-frontend/components
```

## **What is in here?**

This package contains essential BaseApp modules such as `comments`, `notifications`, `messages` and `navigations`. It also includes Storybook, a tool for component documentation and visualization. To run the Storybook locally, run the following command:

```bash
# at root level

pnpm storybook --filter @baseapp-frontend/components
```

## **Build Process**

We use a hybrid build pipeline combining `Babel`, `tsup`, and `TypeScript Compiler` to balance type accuracy, Relay compatibility, and modern bundling:

1. **Source Code:** Original TypeScript/React files with Relay GraphQL queries.

2. **Babel Transformation:**

    * Transpiles TypeScript to JavaScript.

    * Applies Relay compiler transformations (replaces graphql tags with artifact imports).

    * Outputs processed files to a temporary directory `tmp-babel`.

3. **tsup Bundling:**

    * Bundling tool (using esbuild) consumes the `tmp-babel` files.

    * Generates ESM and CJS bundles in `dist`.

4. **TypeScript Compiler (tsc):**

    * Runs in parallel to generate .d.ts type declarations.

    * Outputs declarations to `tmp-dts`.

5. **Merge Outputs:**

    * Copies type declarations from `tmp-dts` to `dist`.

    * Final `dist` contains both runtime bundles and accurate type definitions.

### Pros
One of the biggest wins with this setup is that it leverages tsc to generate type declarations. It is both reliable and fast—even for large projects—so we get accurate types without the performance hit we might see with other solutions.

On the Relay side, using Babel with the official Relay plugin is way more reliable, since it's battle-tested than any custom solution we might try, especially since tools like tsup or esbuild just aren’t built to handle Relay’s GraphQL transformations on their own.

Plus, we still benefit from dual module output (ESM and CJS) along with optimized, compact bundles produced by esbuild and other cool features tsup provides.

### Cons
That said, the build process is a bit more complex since it involves multiple tools running in parallel—Babel for the Relay transformations, tsup for bundling, and tsc for type declarations.

Coordinating these steps and managing temporary directories can add some overhead to our build process. Even though relying on tsc for declarations is much faster than using tsup’s dts process for large projects, the overall pipeline is still more intricate compared to a single-tool solution. This added complexity means there’s a bit more to maintain and tweak as any of these tools evolve.

Furthermore, as the tsup bundling process becomes more complex—for example, if we introduce tree shaking we might need to reconsider how we generate our type declarations, since the current tsc setup may not perfectly align with those bundling features.

### Alternatives Considered

We did explore a few different strategies. A pure tsup/ESBuild pipeline is certainly simpler and can offer faster builds in some cases, but it falls short when it comes to Relay support—neither tsup nor esbuild can handle Relay’s GraphQL transforms without help, and their built-in dts generation isn’t as speedy as tsc on larger codebases.

A Babel-only setup was another option, and while it can handle Relay transformations using the official plugin, it tends to produce larger bundles and doesn’t offer the flexibility of generating both ESM and CJS outputs and others features provided by tsup.

In the end, the hybrid approach was chosen because it strikes the best balance between reliability, performance, and compatibility—even if it means juggling a few more moving parts.