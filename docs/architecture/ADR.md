## Architecture Decision Register

# Release 0 (personal use strcitly)

Aim: Complete fast

1. Basic UI with obsidian dark mode.
2. No local DB, only mmkv cache
3. No complex data analysis, only graphs

---

# Release 1 (User facing full fledged)

## 4. Tech Stack Decisions (ADR summary)

| Decision           | Choice                                                                          | Reason                                                                       |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| Project type       | Bare React Native CLI                                                           | Native control for Storage Access Framework, Notifee, and Keystore behaviour |
| Platform           | Android only                                                                    | Only hardware and toolchain available                                        |
| Database driver    | `react-native-nitro-sqlite`                                                     | Fast JSI-based driver with transactions, WAL, and independent connections    |
| Query layer        | Raw SQL in repositories                                                         | No ORM needed; keeps SQL visible for learning                                |
| State machines     | XState v5                                                                       | Declarative, testable, serialisable                                          |
| Runtime validation | Zod                                                                             | Validates LLM responses and imported data                                    |
| LLM access         | Direct `fetch`                                                                  | `axios` to each provider                                                     | BYOK, no provider SDK, no server |
| Testing            | Jest, React Native Testing Library, better-sqlite3 mock, Maestro for end-to-end | Fast unit tests plus real-device flows                                       |
| Architecture rules | dependency-cruiser in CI                                                        | Enforces hexagonal boundaries automatically                                  |
