# Modern Angular: Micro Frontends

## Setup

```bash
git clone git clone https://github.com/mikezks/20251125 shell
git clone git clone https://github.com/mikezks/20251125 miles --branch miles-ng19-multi
git clone git clone https://github.com/mikezks/20251125 tickets --branch tickets-ng19-multi
```

Open four terminal sessions:

1. Shell

    ```bash
    cd shell
    npx ng s shell
    ```

2. Miles: Single Version

    ```bash
    cd shell
    npx ng s miles
    ```

3. Miles: Multi Version

    ```bash
    cd miles
    npx ng s miles
    ```

4. Tickets: Multi Version

    ```bash
    cd tickets
    npx ng s tickets
    ```

## APIs

### Shell
    
- Provide `provideMfeShell('./mfe.config.json')` in the `app.config.ts` and define the path to the config file that determines if a specific MFE shall be integrated in the Single or Multi Version approach.
- This provider function shares `zone.js`, loads the config and sets the Deep Linking event listener up.
- The `app.routes.ts` may add generic `Route` factory function invocations to integrate a Single or Multi Verions MFE by using `integrateMfe('miles')`.
- The `provideRouter()` feature `withComponentInputBinding()` needs to be used.

### MFE Multi Version

- Provide `provideMultiVersionMfe('mfe-miles', App)` in the `app.config.ts`, define the custom element tagname and reference the root component.
- This provider function consumes the shared `zone.js` instance, wraps the root component as Custom Element, enables Multi Router History API support, provides the unique MFE key and sets the Deep Linking event sender up.
- The `Routes` need to use the same first segment like defined in the Shell.
- The root component needs to use the Host Directive `MfeRouterNavigation` to support multiple Routers with a correctly managed History API stack.