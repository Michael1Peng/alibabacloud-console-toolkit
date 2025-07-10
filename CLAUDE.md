# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**Breezr** (alibabacloud-console-toolkit) is a pluggable build system designed for Alibaba Cloud Console development. It's a monorepo using pnpm workspaces and Lerna for package management, featuring a sophisticated plugin architecture based on the Service/PluginAPI pattern.

## Essential Commands

### Development Setup
```bash
# Bootstrap the entire repository (clean install)
npm run boot

# Install dependencies for monorepo
pnpm install

# Run CI pipeline (lint, compile, test with coverage)
npm run ci
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run cov

# Test specific package
cd packages/{package-name} && npm test
```

### Code Quality
```bash
# Lint all packages
npm run lint

# Lint specific package
cd packages/{package-name} && npm run lint
```

### Building
```bash
# Compile all TypeScript packages
lerna run compile

# Compile specific package
cd packages/{package-name} && npm run compile

# Watch mode for development
cd packages/{package-name} && npm run watch
```

### Publishing
```bash
# Publish canary version
npm run pub:canary
```

## Architecture Overview

### Core Plugin System
The architecture is built around a **Service** class that manages plugins through a **PluginAPI** interface:

- **Service (`packages/core/src/Service.ts`)**: Central orchestrator extending EventEmitter
- **PluginAPI (`packages/core/src/PluginAPI.ts`)**: Facade for plugin interactions
- **Plugin Resolution**: Automatic discovery and loading of plugins
- **Configuration System**: Multi-layer config merging (default → file → env → runtime)

### Key Packages Structure

**Core Infrastructure:**
- `@alicloud/console-toolkit-core`: Plugin system, service management
- `@alicloud/console-toolkit-cli`: CLI interface (`breezr` command)
- `@alicloud/console-toolkit-shared-utils`: Common utilities

**Build Plugins:**
- `plugin-react` / `plugin-webpack5-react`: React application support
- `plugin-typescript` / `plugin-webpack5-typescript`: TypeScript compilation
- `plugin-sass` / `plugin-webpack5-sass`: SASS/SCSS processing
- `plugin-ssr` / `plugin-webpack5-ssr`: Server-side rendering

**Development Tools:**
- `plugin-mocks`: API mocking
- `plugin-storybook`: Storybook integration
- `plugin-docs`: Documentation generation

**Presets:**
- `preset-official`: Standard plugin combination
- `preset-monorepo`: Monorepo-specific configuration
- `preset-wind-component`: Component library preset

### Configuration System

The system reads configuration from:
1. Constructor options (`ServiceOption`)
2. `breezr.config.js` in project root
3. Environment-specific configurations
4. Runtime arguments

Configuration file example:
```javascript
// breezr.config.js
module.exports = {
  presets: ['@alicloud/console-toolkit-preset-official'],
  plugins: [
    '@alicloud/console-toolkit-plugin-webpack5-react',
    ['@alicloud/console-toolkit-plugin-custom', { options }]
  ],
  devServer: { port: 8080 },
  outputPath: './dist'
};
```

### Plugin Development Pattern

Plugins follow this structure:
```typescript
// Plugin entry point
export default function(api: PluginAPI, options: any, args: CommandArgs) {
  // Register commands
  api.registerCommand('commandName', { /* ... */ });
  
  // Register APIs
  api.registerAsyncAPI('apiName', async () => { /* ... */ });
  api.registerSyncAPI('apiName', () => { /* ... */ });
}
```

### Service Initialization Flow

1. **Construction**: Create Service with options, load package.json, resolve built-in plugins
2. **Initialization**: Call `service.init(args)` which:
   - Initializes built-in plugins
   - Resolves presets from config
   - Loads user-defined plugins from config
   - Initializes all plugins with dependency resolution
3. **Execution**: Run commands via `service.run(commandName, args)`

## Key Implementation Details

### Plugin State Management
- Uses `PluginState` enum (UNINIT, INITING, INITED) to prevent duplicate initialization
- Maintains plugin state map to detect circular dependencies
- Supports both local and npm-published plugins

### Command System
- Commands registered via `api.registerCommand(name, commandConfig)`
- Built-in help command with automatic generation
- Error handling with graceful fallback to help

### API System
- Dual API system: sync (`invokeSync`) and async (`invoke`)
- Plugin APIs accessible across the entire system
- Configuration API (`getConfig`) for accessing merged configuration

### TypeScript Integration
- Full TypeScript support with comprehensive type definitions
- Strict compilation settings with declaration file generation
- Type-safe plugin development with proper interfaces

## Development Workflows

### Creating a New Plugin
1. Create package in `packages/plugin-{name}/`
2. Follow the standard package structure with `src/index.ts`
3. Implement plugin entry function
4. Add package.json with proper dependencies
5. Register in presets or use directly in config

### Testing Service Configuration
Use the demo package in `packages/demo/` to test Service initialization:
```bash
cd packages/demo
npm install
npm start
```

### Contributing Guidelines
- Follow Angular commit convention (`feat:`, `fix:`, `chore:`, etc.)
- Branch naming: `feat/`, `fix/`, `chore/` prefixes
- All PRs require CLA signature
- Use semantic versioning (semver)

### Code Standards
- Use TSLint for code style (configuration in individual packages)
- Jest for testing with ts-jest preset
- Coverage reporting enabled
- TypeScript compilation with declaration files

## Common Debugging Patterns

### Service Issues
- Check plugin loading order and dependencies
- Verify configuration file syntax and plugin names
- Use debug logging (debug module is available)
- Check plugin state in `service._pluginStateMap`

### Configuration Problems
- Verify `breezr.config.js` exports valid configuration object
- Check plugin resolution (local vs npm paths)
- Use `service.getConfig()` to inspect merged configuration

### Plugin Development
- Ensure plugin exports default function with correct signature
- Register APIs and commands properly through PluginAPI
- Handle async initialization correctly
- Check plugin ID resolution (built-in vs external)