# Project Plan v2: Solo Developer, Android Only, Bare React Native

**Product:** Local-first mobile app with four modules: `db`, `statemachine`, `notifications`, `llm` (BYOK only)
**Purpose:** Learning and portfolio project, held to production quality
**Developer:** One person acting as senior developer, UI designer, and product manager
**Platform:** Android only (no macOS available, so iOS is out of scope)
**Status:** Ready for planning

---

## 1. What Changed From Plan v1

| Area                  | v1                                 | v2 (this plan)                                                  |
| --------------------- | ---------------------------------- | --------------------------------------------------------------- |
| Team                  | Senior + 4 juniors + QA + designer | One developer, part-time                                        |
| Platform              | iOS and Android                    | Android only                                                    |
| Project type          | Expo managed workflow              | Bare React Native (CLI)                                         |
| Encryption of backups | Spike (T-041)                      | Removed. Not needed.                                            |
| Reviews               | Senior reviews by others           | Self-review with checklist and cooling-off period               |
| Effort basis          | Junior hours                       | Developer hours, with learning budget separated                 |
| Design                | Designer deliverables              | Developer creates UI structure and screens from existing tokens |
| Product               | Fixed feature set                  | PM tasks added; feature list to be supplied later               |
| Learning              | Not planned                        | Dedicated learning tickets (L-01 to L-08)                       |
| Portfolio             | Not planned                        | Portfolio package ticket (T-095)                                |
| Schedule              | 14 weeks, sprint-based             | About 30 weeks, phase-based, with contingency                   |

### 1.1 Package changes forced by bare React Native

Expo packages were replaced with bare React Native equivalents, so the project does not depend on Expo.

| Need                           | v1 package                             | v2 package                                                                     |
| ------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------ |
| Secure storage                 | `expo-secure-store`                    | `react-native-keychain` (Android Keystore)                                     |
| Files                          | `expo-file-system`                     | `react-native-fs`                                                              |
| Document and folder picking    | `expo-document-picker`, `expo-sharing` | Android Storage Access Framework via a wrapper library (chosen in spike T-033) |
| UUID                           | `expo-crypto`                          | `react-native-get-random-values` with `uuid`                                   |
| Google sign-in and Drive token | `expo-auth-session`                    | `@react-native-google-signin/google-signin`                                    |
| Notifications                  | `expo-notifications`                   | `@notifee/react-native`                                                        |
| Navigation                     | `expo-router`                          | `@react-navigation/native` and related packages                                |
| Splash screen                  | `expo-splash-screen`                   | `react-native-bootsplash`                                                      |
| Hashing (SHA-256)              | `expo-crypto`                          | `react-native-quick-crypto`                                                    |

---

## 2. Working Model and Capacity

### 2.1 Weekly availability

| Slot                                      | Hours per day          | Days | Hours per week                    |
| ----------------------------------------- | ---------------------- | ---- | --------------------------------- |
| Weekdays                                  | 2 to 3 (plan with 2.5) | 5    | 10 to 15 (plan with 12.5)         |
| Weekends                                  | 5 to 6 (plan with 5.5) | 2    | 10 to 12 (plan with 11)           |
| **Gross**                                 |                        |      | **20 to 27 (plan with 23.5)**     |
| Less planning, PM, and feature-list work  |                        |      | about 1.5                         |
| **Productive development hours per week** |                        |      | **about 22 (range 18.5 to 25.5)** |

### 2.2 How hours are counted

- **Build hours:** coding, configuration, writing tests, and manual device testing for the task.
- **Learning hours:** a separate budget, tracked in tickets L-01 to L-08. Learning is not hidden inside task estimates, so you can see what it costs.
- **Contingency:** 25% of build hours, held at the end of the plan. Moonlighting causes interruptions, and new native code always takes longer than expected.

### 2.3 Quality without a reviewer

With no senior reviewer, quality comes from these mechanisms:

1. **Definition of Done checklist** (section 13) applied to every ticket.
2. **Cooling-off review:** before merging any [REVIEW] ticket, wait at least 24 hours and then review the diff against the checklist.
3. **Decision records (ADRs):** every significant choice is written down in `docs/adr/`. This is useful for learning and for the portfolio.
4. **Automated gates:** CI runs typecheck, lint, dependency rules, and tests on every commit.
5. **Device tests:** the failure-critical paths (save, backup, restore) are verified on a physical Android device.

---

## 3. Scope

### 3.1 In scope

- Android, supporting the minimum SDK from the React Native template.
- Local entry capture, Markov and tagged projections, and history.
- Backup to Google Drive (app-private `appDataFolder`) and to a user-chosen folder via Android Storage Access Framework.
- Restore with staging, verification, migration forward, and rollback.
- Daily reminder and backup and analysis notifications.
- Analysis through the user's own API key (BYOK) for Anthropic, OpenAI, or Gemini, with explicit consent.
- The UI structure, design tokens, and screens, built by the developer.

### 3.2 Out of scope

- iOS, in every form (no macOS available).
- Backup encryption (decided: not needed).
- Multi-device sync and conflict resolution.
- On-device models, and any server or proxy for LLM calls.
- Feature list items not yet supplied (added after the feature list is provided, see T-073).

---

## 5. Task Index

Build hours include manual testing. Learning hours are listed separately in section 6.

| Phase                    | Tickets        | Focus                                       | Build hours | Learning hours |
| ------------------------ | -------------- | ------------------------------------------- | ----------- | -------------- |
| 0. Foundation            | T-001 to T-013 | Tooling, native setup, kernel, UI structure | 51          | 19             |
| 1. Database and backup   | T-014 to T-043 | `db` module                                 | 164         | 16             |
| 2. State machines        | T-044 to T-052 | `statemachine` module                       | 46          | 4              |
| 3. Notifications         | T-053 to T-058 | `notifications` module                      | 30          | 0              |
| 4. LLM (BYOK)            | T-059 to T-072 | `llm` module                                | 67          | 0              |
| 5. UI and product        | T-073 to T-085 | `ui` and PM tasks                           | 71          | 0              |
| 6. Hardening and QA      | T-086 to T-090 | Quality gates                               | 31          | 4              |
| 7. Release and portfolio | T-091 to T-095 | Store and portfolio                         | 30          | 0              |
| **Totals**               | **95 tickets** |                                             | **490**     | **43**         |

**Planned hours:** 490 build + 43 learning = **533 hours**.
**With 25% contingency on build hours:** 533 + 122 = **655 hours**.

---

## 6. Learning Tickets

Learning tickets are scheduled inside the phase that needs them. Each one has a concrete output, so the learning produces something you can show.

| ID        | Topic                                                                          | Hours  | Scheduled in | Output (what you can show)                                         |
| --------- | ------------------------------------------------------------------------------ | ------ | ------------ | ------------------------------------------------------------------ |
| L-01      | React Native bare workflow, New Architecture, Hermes, and TurboModules basics  | 8      | Phase 0      | A short written note in `docs/learning/rn-architecture.md`         |
| L-02      | Android native basics: Gradle, manifest, permissions, Activity lifecycle       | 8      | Phase 0      | Annotated notes plus a working permission request in a scratch app |
| L-03      | SQLite internals: WAL, `synchronous`, transactions, `VACUUM INTO`, query plans | 6      | Phase 1      | Benchmark results in `docs/learning/sqlite.md`                     |
| L-04      | XState v5: actors, guards, invoked promises                                    | 4      | Phase 2      | One toy machine with tests                                         |
| L-05      | OAuth 2.0 with PKCE and Google Drive `appDataFolder`                           | 4      | Phase 1      | Diagram of the sign-in and token flow                              |
| L-06      | Testing: Jest, React Native Testing Library, Maestro                           | 4      | Phase 6      | One working Maestro flow committed to the repo                     |
| L-07      | Hexagonal architecture reading and ADR writing                                 | 3      | Phase 0      | First three ADRs written                                           |
| L-08      | Kotlin basics for reading and writing native module code                       | 6      | Phase 1      | Small Kotlin method called from JavaScript                         |
| **Total** |                                                                                | **43** |              |                                                                    |

---

## 7. Phase 0: Foundation

### T-001: Initialise bare React Native project with strict TypeScript

- **Description:** Create the project with the React Native CLI, Android target only. Enable TypeScript `strict`. Pin all dependency versions exactly. Configure ESLint, Prettier, and the basic scripts.
- **External packages:** `react-native`, `typescript`, `eslint`, `prettier`, `@react-native/eslint-config`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - `npx react-native run-android` launches the default screen on an emulator.
  - `tsc --noEmit` passes with `strict: true`.
  - Lint and format checks pass. No `^` or `~` in `package.json`.
  - The iOS folder is removed or excluded from scripts, and the README states iOS is out of scope.

### T-002: Folder structure and path aliases

- **Description:** Create the structure from the design: `src/shared`, `src/platform`, `src/modules/{db,statemachine,notifications,llm}/{domain,application,infrastructure}`, `src/ui`, `src/composition`, `src/test`. Add aliases such as `@shared/*` and `@modules/*`.
- **External packages:** `babel-plugin-module-resolver`.
- **Effort:** 2 hours.
- **Acceptance criteria:**
  - Aliases resolve in Metro, TypeScript, and Jest.
  - A sample import across aliases works in a test.

### T-003: Architecture boundaries with dependency-cruiser

- **Description:** Write rules that fail the build on layering violations: domain imports nothing from application, infrastructure, UI, or React Native; application imports no infrastructure; UI imports no infrastructure; modules do not import each other's infrastructure.
- **External packages:** `dependency-cruiser`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - A deliberate violation fails `npm run depcruise`.
  - Each rule has a one-line comment explaining its purpose.

### T-004: CI pipeline (GitHub Actions)

- **Description:** On every push and pull request, run install, typecheck, lint, format check, dependency rules, and unit tests. Cache `node_modules` and Gradle. Android unit tests only; device tests run locally and nightly.
- **External packages:** GitHub Actions (no npm package).
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - A failing test blocks the merge.
  - A clean run completes in under 8 minutes.

### T-005: Shared kernel

- **Description:** Implement `Result`, the `AppError` base class with stable string codes and subclasses (validation, storage, network, permission, auth), and the ports `Clock` and `Id`. No React Native imports.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - `Result` narrows correctly, verified by a type test.
  - Every error class has a stable code.
  - The kernel has zero imports from `react*` or `@react-native*`.

### T-006: Platform adapters: clock, IDs, and Keystore-backed secret store

- **Description:** `SystemClock`, `UuidAdapter` (using `react-native-get-random-values`), and `SecureStoreAdapter` implementing the `SecureStore` port on `react-native-keychain` with a service name per namespace.
- **External packages:** `react-native-get-random-values`, `uuid`, `react-native-keychain`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - 10,000 generated UUIDs are unique in a test.
  - A stored secret round-trips on the emulator and a physical device.
  - The adapter never logs stored values.

### T-007: Composition root and React context

- **Description:** `composition/root.ts` builds all adapters into a container. `composition/providers.tsx` exposes it through context and a typed `useContainer()` hook. `composition/config.ts` holds feature flags and backup defaults.
- **External packages:** `react`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Only `root.ts` imports from `platform/` and `infrastructure/`.
  - `useContainer()` throws a clear error outside the provider.
  - Tests can build the container with fakes.

### T-008: Test harness and fakes

- **Description:** Configure Jest with the React Native preset. Add `test/fakes/` with in-memory clock, ID generator, secret store, and file system.
- **External packages:** `jest`, `@testing-library/react-native`, `react-test-renderer` (if required by the template version).
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - `npm test` runs and passes a sample test.
  - Coverage report is generated.

### T-009: Android development environment and device run

- **Description:** Install JDK, Android SDK, and an emulator. Connect a physical Android device with USB debugging. Run debug builds on both. Document the setup in `docs/dev-setup.md`.
- **External packages:** none (toolchain).
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Debug build runs on the emulator and on the physical device.
  - Hot reload works.
  - Setup document lets a clean machine reproduce the build.

### T-010: Install NitroSQLite and smoke test

- **Description:** Install `react-native-nitro-sqlite` and `react-native-nitro-modules`. Build for Android. Open a database and run one query from JavaScript.
- **External packages:** `react-native-nitro-sqlite`, `react-native-nitro-modules`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Build succeeds and the app runs without a native crash.
  - A `SELECT 1` returns the expected row on the emulator and the device.
  - Versions are pinned and the upgrade procedure is noted in the ADR.

### T-011: [SPIKE] NitroSQLite behaviour on Android

- **Description:** Time-boxed investigation of what the design depends on: async execution, transaction rollback on error, WAL mode, a reader connection working while a writer transaction is open, and `VACUUM INTO`. Output: a decision record with evidence for each item.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Each of the five behaviours is marked pass or fail with evidence.
  - Each failure has a workaround or a design change recorded in an ADR.

### T-012: Navigation skeleton and placeholder screens (UI structure)

- **Description:** Set up the app's navigation structure: a bottom tab navigator with tabs for Capture, History, Analysis, and Settings. Each tab has a placeholder screen. Settings holds nested stack screens for Backup, Restore, Notifications, and LLM key. This is the UI structure the rest of the UI work fills in.
- **External packages:** `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-screens`, `react-native-safe-area-context`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - All placeholder screens are reachable from the navigation structure.
  - Back navigation works on Android hardware back button.
  - Route names are defined in one typed file.

### T-013: Design tokens to theme

- **Description:** Convert the existing design tokens (colours, typography, spacing, radii, elevation) into a typed theme module. Provide a theme context and light and dark variants that follow the system setting.
- **External packages:** none (optionally `style-dictionary` if tokens are in its format).
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Every token from the designer's file is present in the theme, verified by a test against the source file.
  - Switching system theme updates the app without a restart.
  - No hard-coded colour appears outside the theme module (checked by a lint rule or grep in CI).

---

## 8. Phase 1: Database and Backup (module `db`)

### 1A. Connections, queue, and migrations

### T-014: Connection manager (writer and reader)

- **Description:** Open two connections to the same database file. Apply pragmas on each open: `journal_mode = WAL`, `foreign_keys = ON`, busy timeout, and `synchronous` from config.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Both connections report `wal` and foreign keys on.
  - `close()` is idempotent and closes both connections.

### T-015: Serialised write queue

- **Description:** A FIFO queue that runs one write at a time. A failed operation does not block later operations.
- **External packages:** none.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - 1,000 concurrent enqueued writes produce the same final result as sequential execution.
  - A throwing operation does not stop the queue.
  - `close()` resolves only after the queue drains.

### T-016: Migration runner

- **Description:** Read ordered migration files, apply those above `schema_version` in `app_meta`, each in its own transaction. Reject duplicate or out-of-order numbers.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - A fresh database reaches the latest version.
  - A second run applies nothing.
  - A failing migration rolls back and leaves the version unchanged.

### T-017: Migration 0001: entries

- **Description:** `entries` table, plus a child table for the 2 to 3 rows per UI entry, linked by `entry_id`. Include `created_at` and `device_id`. Add only indexes that a documented read path needs.
- **External packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Migration applies on an empty database.
  - A child row with a bad `entry_id` is rejected.

### T-018: Migration 0002: Markov tables

- **Description:** `markov_transitions` with composite primary key `(from_state, to_state)` and `count`. `markov_cursor` with one row per stream holding `last_state`.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Migration applies on top of 0001.
  - A duplicate transition key is rejected.

### T-019: Migration 0003: tagged feed

- **Description:** `tagged_feed` table, with columns agreed in T-059, an `entry_id` reference, and an index for the feed query.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Migration applies cleanly.
  - `EXPLAIN QUERY PLAN` shows the index is used by the feed query.

### 1B. Domain and repository

### T-020: Entry entity and invariants

- **Description:** `Entry` type, child parts, and `Entry.create(input)` returning `Result`. Validation rules come from the product spec. Domain imports only `shared`.
- **External packages:** none.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Each invariant has a passing and a failing test.
  - `create` never throws.

### T-021: EntryRepository port and in-memory fake

- **Description:** Port with `save`, `findById`, `listRecent`. The in-memory fake matches the port and rejects duplicate IDs the same way the real repository does.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - The fake satisfies the port with no type errors.

### T-022: NitroEntryRepository.save with one transaction

- **Description:** Write the entry and its child rows in one transaction through the writer queue. Any failure rolls back everything.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - A successful save writes exactly one entry and the expected child rows.
  - A failure injected between child inserts leaves zero rows.
  - Passes against the better-sqlite3 mock in unit tests.

### T-023: Markov projection update

- **Description:** Inside the same transaction, update `markov_cursor` and upsert `markov_transitions` with `INSERT ... ON CONFLICT DO UPDATE SET count = count + 1`. The first entry in a stream writes only the cursor.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - Saving A, B, A, B gives A to B = 2 and B to A = 1.
  - Rolling back an entry also rolls back its transition and cursor changes.

### T-024: Tagged feed projection write

- **Description:** Inside the same transaction, write `tagged_feed` rows using the mapping function from the `llm` domain, so the mapping rules live in one place.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Mapping output matches a snapshot fixture for 10 sample entries.
  - Failure injection rolls back tagged rows together with entry rows.

### T-025: Repository contract test suite

- **Description:** One suite runs against both the in-memory fake and the Nitro repository (better-sqlite3 mock). It asserts identical behaviour for save, find, list, and duplicates.
- **External packages:** `better-sqlite3`, `react-native-nitro-sqlite/mock`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Both implementations pass the same suite in CI.
  - A deliberate divergence fails the suite.

### T-026: Trend feed read queries

- **Description:** `NitroTrendFeed` reads aggregated tagged data and top Markov transitions through the reader connection. Reads never enter the writer queue.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - A spy confirms reads use the reader connection.
  - Results match fixture aggregates.

### T-027: saveEntry use case

- **Description:** Build the entry with `Entry.create`, call `EntryRepository.save`, publish `EntrySaved`. No SQL, no infrastructure imports.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - One event on success, none on validation failure.
  - Tests use only the in-memory fake.

### T-028: Reader independence test on device

- **Description:** On a physical device, start a writer transaction, run a reader query, and confirm the reader returns before the transaction commits.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Result recorded in the test notes with timing.
  - The test runs on the physical device, not only the emulator.

### 1C. Snapshot and verification

### T-029: Snapshotter using VACUUM INTO

- **Description:** Run `VACUUM INTO` on the reader connection, writing to the app's cache directory with a timestamp and schema version in the file name.
- **External packages:** `react-native-nitro-sqlite`, `react-native-fs`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Snapshot exists and contains entries saved before the call.
  - Writes during the snapshot do not produce a partial copy (verified by test).

### T-030: Snapshot verification

- **Description:** `verifySnapshot(path)` opens the copy read-only, runs `PRAGMA integrity_check`, reads `schema_version`, and computes a SHA-256 hash by streaming the file.
- **External packages:** `react-native-nitro-sqlite`, `react-native-quick-crypto`, `react-native-fs`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Valid snapshot returns metadata with hash and version.
  - A corrupted fixture fails with a typed error.
  - The connection closes in every path.

### T-031: Snapshot cache management

- **Description:** Remove temporary snapshot files older than a configured age, and remove leftovers from failed runs on app start. Never touch the live database file.
- **External packages:** `react-native-fs`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Old files are removed; recent files are kept.
  - The live database is never deleted.

### 1D. Backup targets

### T-032: BackupTarget port and registry

- **Description:** Port with `id`, `displayName`, `isConfigured`, `upload`, `list`, `download`, `delete`. A registry returns targets by id and errors on unknown ids.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - A fake target can be registered in tests.
  - Unknown ids return a typed error.

### T-033: [SPIKE] Android Storage Access Framework library evaluation

- **Description:** Evaluate maintained React Native libraries that support Storage Access Framework folder picking, writing, listing, and reading. Candidates include `react-native-saf-x` and `@react-native-documents/picker`. Compare maintenance activity, API coverage, and whether they work with the New Architecture. Pick one and record the decision.
- **External packages:** candidates to be evaluated.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Decision record compares at least two libraries with a written recommendation.
  - Test app proves a file can be written to a user-picked folder and read back.

### T-034: FileExportTarget (Android Storage Access Framework)

- **Description:** Implement `FileExportTarget` using the library chosen in T-033. The user picks a folder once. Upload copies the snapshot into it. List and download work on files the app created. Cancelling the picker returns a typed "cancelled" result.
- **External packages:** library chosen in T-033.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - A backup written to a user-chosen folder can be found in a file manager.
  - Restoring from that folder works.
  - Cancelling returns "cancelled", not an error.

### T-035: Google Drive sign-in

- **Description:** Use `@react-native-google-signin/google-signin` requesting only the `drive.appdata` scope. Configure an Android OAuth client in Google Cloud with the package name and the SHA-1 of both debug and release signing keys. Sign-in and sign-out handled in one adapter.
- **External packages:** `@react-native-google-signin/google-signin`.
- **Effort:** 8 hours (includes Google Cloud setup).
- **Acceptance criteria:**
  - Sign-in and cancel both work without a crash on the device.
  - The granted scope is `drive.appdata` only (verified in the consent screen and in the token).
  - No client secret is present in the app bundle.

### T-036: Google Drive REST adapter

- **Description:** `GoogleDriveTarget` on `fetch` with the access token from the sign-in library. Multipart upload, list by name prefix, download to a local path, delete by file id. Uses the `appDataFolder` space.
- **External packages:** none beyond `fetch`.
- **Effort:** 10 hours.
- **Acceptance criteria:**
  - A snapshot uploads and appears in `list()`.
  - A downloaded file's hash matches the uploaded file.
  - Repeated uploads with the same name do not create visible duplicates.

### T-037: Drive error mapping and retry

- **Description:** Map HTTP responses to domain errors: unauthorised, quota exceeded, network, not found. Refresh the token once on 401 through the sign-in library. Retry 5xx and network failures with exponential backoff up to a fixed cap. Do not retry quota errors.
- **External packages:** none beyond `fetch`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - A 401 triggers one refresh, then the request succeeds.
  - A 503 retries with increasing delays, then fails after the cap.
  - A 403 quota error is not retried.

### 1E. Backup policy and use cases

### T-038: backupPolicy pure rules

- **Description:** Pure functions: backup due by time window (default 24 hours), by new-entry threshold, or by user request. Retention returns the set of backups to keep (last N).
- **External packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Boundary tests for each rule.
  - Retention correct for lists shorter than, equal to, and longer than N.
  - No I/O.

### T-039: createBackup use case with single-flight lock

- **Description:** Check policy, take the lock, snapshot, verify, upload, then publish `BackupCompleted` or `BackupFailed`. Temporary files are removed on every path.
- **External packages:** none (uses ports).
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Two simultaneous calls produce one run; the second returns "already running".
  - A failed upload never reports success.
  - Temporary files are removed on success and failure.

### T-040: Retention cleanup

- **Description:** After a new backup is confirmed in `list()`, delete backups outside the retention set through the target's `delete`.
- **External packages:** none.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Nothing is deleted if the new backup is not visible in `list()`.
  - A delete failure is logged as a warning and does not fail the backup.

### T-041: Restore: stage, verify, migrate forward

- **Description:** Download the chosen snapshot to a staging path, verify it (T-030), and if its schema is older, run migrations on the staged copy. The live database is not touched in this step.
- **External packages:** `react-native-nitro-sqlite`, `react-native-fs`.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - A staged older snapshot is migrated and passes integrity check.
  - The live database's hash is unchanged after this step.
  - A hash mismatch aborts and deletes the staged file.

### T-042: [REVIEW] Restore swap and rollback

- **Description:** Flush and close connections, take a pre-restore snapshot of the live database, swap the staged file in, reopen, and run integrity checks. Roll back from the pre-restore snapshot on any failure after the swap. This is the highest-risk code in the project.
- **External packages:** `react-native-nitro-sqlite`, `react-native-fs`.
- **Effort:** 10 hours build, plus 3 hours self-review (after the 24-hour cooling-off period).
- **Acceptance criteria:**
  - A simulated failure at each step (after pre-snapshot, after swap, during reopen) leaves a valid database.
  - Failure matrix is written up in `docs/adr/` and checked against the device test results.
  - Self-review checklist (section 13) is completed and recorded.

### T-043: Refuse snapshots from newer schema versions

- **Description:** If a snapshot's schema version is higher than the app supports, stop before touching any file and show an "update the app" message.
- **External packages:** none.
- **Effort:** 2 hours.
- **Acceptance criteria:**
  - Test confirms no file is modified.
  - Error code differs from the corruption error.

---

## 9. Phase 2: State Machines (module `statemachine`)

### T-044: XState setup and shared types

- **Description:** Install `xstate` v5. Shared event and context types in `statemachine/domain/types.ts`. Machines are pure definitions.
- **External packages:** `xstate`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Types compile under `strict`.
  - A trivial machine transitions in a test.

### T-045: entryCapture machine

- **Description:** States `draft`, `validating`, `saving`, `saved`, `failed`. Retry from `failed` back to `saving`.
- **External packages:** `xstate`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Every transition is tested.
  - No path reaches `saved` without passing through `saving`.

### T-046: backup machine

- **Description:** States `idle`, `checking`, `snapshotting`, `uploading`, `done`, `failed`. Cancel from any active state cleans up and returns to `idle`.
- **External packages:** `xstate`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Cancel from every active state reaches `idle` with cleanup.
  - Machine snapshot serialises to JSON.

### T-047: restore machine

- **Description:** States `idle`, `confirming`, `staging`, `verifying`, `swapping`, `done`, `rolledBack`. Requires an explicit `CONFIRM` event before staging.
- **External packages:** `xstate`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - No path reaches `staging` without `CONFIRM`.
  - Every failure leads to `rolledBack` or `failed`.

### T-048: analysis machine

- **Description:** States `idle`, `queued`, `running`, `done`, `failed`. A consent guard prevents `queued` without consent.
- **External packages:** `xstate`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Without consent, the machine stays in `idle`.

### T-049: machineHost and event subscriptions

- **Description:** Start the machines, subscribe to domain events (`EntrySaved`, `BackupCompleted`, and others), forward them as machine events. Unsubscribe on stop.
- **External packages:** `xstate`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - `EntrySaved` moves the capture machine to `saved`.
  - Stopping the host leaves no listeners (verified by test).

### T-050: Actors wired to use cases

- **Description:** `backupActor`, `restoreActor`, `analysisActor` call use cases and map results to events. No SQL and no SDK calls in actors.
- **External packages:** `xstate`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - A backup run through the machine gives the same result as calling `createBackup` directly.
  - A failing use case moves the machine to `failed` with the error in context.

### T-051: Persisted restore progress

- **Description:** Restore progress is stored as a small JSON file outside the live database, because the database is what restore replaces. Backup state may use `app_meta`.
- **External packages:** `react-native-fs`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Progress survives an app kill and is read on next launch.
  - Writing progress never touches the live database file.

### T-052: Crash-resume tests

- **Description:** Simulate app death at each state of backup and restore, using fakes. Document the expected outcome for each state.
- **External packages:** `jest`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Every state has a documented outcome on resume.
  - An interrupted swap is rolled back on next launch.

---

## 10. Phase 3: Notifications (module `notifications`)

### T-053: Notification types and quiet hours

- **Description:** `Notification` value type and a pure `quietHours` function that moves times out of the quiet window, including windows that cross midnight.
- **External packages:** none.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Midnight-crossing windows are tested.
  - No imports outside `shared`.

### T-054: Notifier port and Notifee adapter (Android channels and permission)

- **Description:** Define `Notifier` and `ReminderScheduler` ports. Implement with `@notifee/react-native`: create three channels (reminders, backup outcomes, analysis), request the Android 13+ notification permission only when the user enables a notification feature, and post or schedule with timestamp triggers.
- **External packages:** `@notifee/react-native`.
- **Effort:** 10 hours.
- **Acceptance criteria:**
  - A test notification appears on the physical device in the correct channel.
  - Permission is requested only from the enabling action, not at launch.

### T-055: scheduleDailyReminder

- **Description:** Use quiet hours to pick the time, cancel any existing reminder, schedule the new one, and store its id so it can be cancelled.
- **External packages:** `@notifee/react-native` (through port).
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Scheduling twice leaves one active reminder.
  - Changing quiet hours reschedules.

### T-056: notifyBackupOutcome

- **Description:** Subscriber to `BackupCompleted` and `BackupFailed` that posts one notification. Failure text comes from the error code, never raw technical detail.
- **External packages:** none beyond the port.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Each event posts exactly one notification.
  - No notification contains a stack trace or token.

### T-057: notifyAnalysisReady

- **Description:** Post a notification on analysis completion. Tapping it opens the Analysis tab.
- **External packages:** `@notifee/react-native`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Tap opens the Analysis tab on the device.
  - No notification if the user disabled analysis alerts.

### T-058: Permission denied handling

- **Description:** When permission is denied, show a message in settings with a button that opens the app's notification settings (`Linking.openSettings()`). Remember the denial and avoid repeated prompts.
- **External packages:** none (React Native `Linking`).
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Denied state is visible in settings.
  - The button opens the correct system page on the device.

---

## 11. Phase 4: LLM Module (BYOK only)

The module is strictly bring-your-own-key. The app holds no provider key of its own, makes no server calls, and sends only data the privacy rules allow.

### T-059: [REVIEW] Trend query shape and privacy rules

- **Description:** Define input and output types in `llm/domain/trendQuery.ts` and the redaction rules in `privacy.ts`. Only aggregated tagged features and Markov summaries may leave the device. Raw entry text requires explicit per-request opt-in. Agree the `tagged_feed` column list here (feeds T-019).
- **External packages:** `zod`.
- **Effort:** 6 hours build, plus 2 hours self-review (after cooling-off).
- **Acceptance criteria:**
  - Redaction removes fields not on the allow-list, tested with a fixture containing sensitive fields.
  - Rules documented in `docs/llm-privacy.md`.
  - Column list for `tagged_feed` recorded in an ADR.

### T-060: ModelClient port and error types

- **Description:** `generate(request)` returns `ModelResponse` or a typed error: `AuthError`, `RateLimitError`, `NetworkError`, `ProviderError`, `InvalidResponseError`. No provider-specific fields.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Each error has a stable code and carries no secrets.

### T-061: ApiKeyStore (BYOK)

- **Description:** One key per provider, stored through the `SecureStore` port on Android Keystore. Methods: `save`, `get`, `remove`, and `mask` (shows last 4 characters only). Keys never appear in logs, errors, or analytics.
- **External packages:** `react-native-keychain`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - A test confirms the key is absent from every thrown error and log call.
  - `remove` makes subsequent `get` return null.

### T-062: Consent store and checkConsent

- **Description:** Per-provider consent for sending aggregated data. Revocable. Required before any analysis request.
- **External packages:** none beyond the secure store or `app_meta`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Analysis is blocked without consent for the selected provider.
  - Revoking consent blocks the next analysis immediately.

### T-063: Versioned prompt templates

- **Description:** `trendAnalysis.prompt.ts` as a pure builder with a version constant. The version is stored with each analysis result.
- **External packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Snapshot test on the built prompt.
  - Version appears in the output type.

### T-064: analyzeTrends use case

- **Description:** Check consent, read aggregates through `TrendFeed`, redact, build the prompt, call `ModelClient`, validate, store, publish `AnalysisCompleted`. Never calls a provider directly.
- **External packages:** none beyond ports.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Without consent, returns `ConsentRequired` and makes no network call (checked with a fake).
  - The request sent to the fake contains only allowed fields.

### T-065: HTTP client base

- **Description:** Shared `fetch` wrapper with timeout via `AbortController`, cancellation, bounded retry for 429 and 5xx that honours `Retry-After`, and status-to-error mapping. Never logs headers.
- **External packages:** none beyond `fetch`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Timeout returns `NetworkError` after the configured duration.
  - `Retry-After: 2` delays the retry by at least 2 seconds.
  - No header reaches any logger (tested).

### T-066: Anthropic adapter

- **Description:** `AnthropicModelClient` using the HTTP client and the user's key. Model name comes from configuration. Maps response to `ModelResponse`.
- **External packages:** none beyond `fetch`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Mocked endpoint returns a parsed response.
  - Invalid key returns `AuthError`.

### T-067: OpenAI adapter

- **Description:** `OpenAIModelClient` with the same contract.
- **External packages:** none beyond `fetch`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Passes the contract suite from T-072.

### T-068: Gemini adapter

- **Description:** `GeminiModelClient` with the same contract. The key is sent in a header, never in the URL.
- **External packages:** none beyond `fetch`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Passes the contract suite.
  - No URL built by the client contains the key (tested).

### T-069: Key validation flow

- **Description:** `validateKey(provider, key)` makes one minimal request. Save the key only if validation succeeds.
- **External packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Invalid key is not saved.
  - Network failure shows a network message, not an authentication message.

### T-070: Migration 0004: analysis runs

- **Description:** `analysis_runs` table: id, created_at, provider, model, prompt_version, status, result JSON. No column can hold a key.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Migration applies cleanly.
  - Schema test confirms no key-like column exists.

### T-071: Response parsing and validation

- **Description:** Validate every provider response with a Zod schema. Failures become `InvalidResponseError` and raw output is not stored.
- **External packages:** `zod`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Valid fixtures parse; invalid ones (missing fields, wrong types, extra prose) fail.
  - Raw output is never persisted on failure.

### T-072: Fake ModelClient and contract suite

- **Description:** `FakeModelClient` with scripted responses and errors. One contract suite that all three adapters must pass, using recorded fixtures.
- **External packages:** `jest`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - All three adapters pass the same suite.
  - Fake supports sequences such as rate limit then success.

---

## 12. Phase 5: UI and Product

The developer is the UI designer and product manager. Design work is tracked as tickets so it is planned and not treated as free time.

### T-073: Feature list intake and prioritisation

- **Description:** Placeholder ticket. When the feature list is supplied, score each feature for launch scope, sequence it into the phases, and add tickets for new features. Until then, this ticket holds 2 hours for the initial intake.
- **External packages:** none.
- **Effort:** 2 hours now, plus an estimate per new feature when the list arrives.
- **Acceptance criteria:**
  - Every feature is marked in scope, deferred, or rejected, with a reason.
  - New tickets follow the same template.

### T-074: UI component library from tokens

- **Description:** Build the shared components: Text, Button, Card, TextField, Chip, Banner, and an empty-state block. Each reads from the theme (T-013).
- **External packages:** none.
- **Effort:** 10 hours.
- **Acceptance criteria:**
  - Every component has a light and dark variant.
  - Component tests cover disabled, loading, and error states where applicable.

### T-075: Entry capture screen

- **Description:** Form to enter data, connected to the `entryCapture` machine. Shows pending and saved states. Blocks double submission.
- **External packages:** none beyond navigation.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - Double-tap creates one entry.
  - Validation messages sit beside their fields.

### T-076: Entry history list

- **Description:** Paged list of recent entries, showing each UI entry's 2 to 3 rows as one item.
- **External packages:** none (`FlatList`).
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Paging loads without duplicates.
  - Empty state explains what to do.

### T-077: Backup settings screen

- **Description:** Choose target (Google Drive or folder), see last backup time, trigger a manual backup, set window and retention.
- **External packages:** none.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Manual backup shows progress and a clear result.
  - Changing target does not delete existing backups.

### T-078: Restore screen with confirmation

- **Description:** List backups with metadata (date, entry count, schema version). Explain that current data will be replaced. Restore starts only after explicit confirmation.
- **External packages:** none.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Restore cannot start without the confirmation step.
  - Newer-schema backups show the update-app message.

### T-079: Notification settings screen

- **Description:** Toggles for reminder, backup alerts, and analysis alerts. Reminder time picker. Permission status with a link to system settings.
- **External packages:** `@react-native-community/datetimepicker`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Settings persist across restarts.
  - Disabling a feature cancels its scheduled items.

### T-080: LLM provider and BYOK key screen

- **Description:** Choose provider, enter key, see masked key, validate, remove. Explains plainly that the key stays on the device and requests go directly from the device to the provider.
- **External packages:** none beyond ports.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - The saved key is never shown in full.
  - Invalid key and no network produce different messages.
  - Removing the key stops analysis immediately.

### T-081: Analysis screen with consent and results

- **Description:** Consent for the chosen provider, run analysis through the analysis machine, show results with provider, model, and prompt version.
- **External packages:** none beyond ports.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - Analysis cannot start without consent.
  - Cancel during a run leaves a consistent state.

### T-082: Loading, error, and empty states

- **Description:** One consistent pattern for loading, error, and empty across all screens. Errors show the user message from the domain error code, never a stack trace.
- **External packages:** none.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Every screen implements all three states.
  - Component tests verify the states on at least two screens.

### T-083: First-run onboarding

- **Description:** Short flow explaining local storage, optional backup, optional notifications, and optional BYOK analysis. Each permission or key is requested only at the moment the user chooses that feature.
- **External packages:** `react-native-bootsplash` (splash handled separately in T-091).
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - No permission prompt appears without a user action.
  - Every optional step can be skipped.

### T-084: UX flows and wireframes for remaining screens

- **Description:** Design task. Produce user flows and low-fidelity wireframes for every screen in section 12, using the design tokens. Store them in `docs/design/` and link from the navigation file.
- **External packages:** none (design tool of choice).
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Every screen in the navigation structure has a wireframe.
  - Every flow includes its error path.

### T-085: Accessibility pass

- **Description:** Check TalkBack labels, touch target sizes (at least 48 dp), contrast, and large font scaling on every screen.
- **External packages:** none (Android Accessibility Scanner).
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Accessibility Scanner reports no critical issues.
  - Layouts remain usable at the largest system font size.

---

## 13. Phase 6: Hardening and Quality

### T-086: Maestro end-to-end flows

- **Description:** Maestro flows on the Android emulator covering: create entries, back up to the folder target, clear app data, restore, and verify entry count and Markov counts match.
- **External packages:** Maestro CLI (not an npm dependency).
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - Round trip matches for 500 generated entries.
  - Flows run from a single command documented in the README.

### T-087: Failure injection on device

- **Description:** Kill the app during backup upload, restore staging, and restore swap (using `adb shell am force-stop` and an injected failure hook in debug builds). Verify recovery on relaunch.
- **External packages:** none beyond Maestro and ADB.
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - Each kill point has an expected outcome, and the observed outcome matches.
  - No kill point leaves the app unable to start.

### T-088: Security and privacy review

- **Description:** Checklist review: secrets in logs and errors, Android backup settings (`allowBackup` and data extraction rules so the database and keys are excluded from automatic cloud backup), network security config (HTTPS only), OAuth scope, and data leaving the device (only to user-chosen targets and the chosen LLM provider).
- **External packages:** `npm audit`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Written report with a status for every checklist item.
  - No critical or high finding is open at release.

### T-089: Write performance benchmark

- **Description:** On a physical mid-range Android device, measure save latency and snapshot time at 10,000 and 100,000 entries.
- **External packages:** `react-native-nitro-sqlite`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - p95 save latency under 100 ms at 100,000 entries, or a documented mitigation.
  - Snapshot time recorded and compared against the backup schedule.

### T-090: Privacy policy and Play Data safety

- **Description:** Write the privacy policy and the Play Console Data safety form. Cover local storage, Drive scope, BYOK behaviour, and what is never sent anywhere. Check that every statement matches what T-088 verified.
- **External packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Each statement in the policy is traceable to a verified behaviour.
  - Policy is hosted at a public URL.

---

## 14. Phase 7: Release and Portfolio

### T-091: Icon, splash, and store assets

- **Description:** App icon (adaptive icon for Android), splash via `react-native-bootsplash`, feature graphic, screenshots from the emulator, short and full store descriptions.
- **External packages:** `react-native-bootsplash`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - All required Play Store sizes are present.
  - Screenshots match the shipped UI.

### T-092: Release build and signing

- **Description:** Configure Play App Signing with an upload key. Generate a signed AAB. Enable R8 and ProGuard rules for React Native and the native libraries. Set `versionCode` and `versionName` scheme.
- **External packages:** Gradle configuration (no npm package).
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - A signed release AAB installs on the physical device.
  - Release build passes T-086 flows.
  - Keystore is backed up outside the repository.

### T-093: Play closed testing and production access

- **Description:** Recruit testers and run a closed test on the Play Console. Personal developer accounts created after November 2023 must run a closed test with at least 12 testers for 14 continuous days before applying for production access. Verify the current requirement in the Play Console when you start.
- **External packages:** none.
- **Effort:** 6 hours (recruiting, coordination, and feedback triage).
- **Acceptance criteria:**
  - Test has run for the required number of testers and days.
  - Blocking feedback is resolved or logged.

### T-094: Release checklist and staged rollout

- **Description:** Run the checklist: privacy and store metadata verified, backup and restore verified on the release build, Google OAuth consent screen verification status checked, rollback plan written. Submit and roll out in stages (for example, 10%, then 50%, then 100%).
- **External packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Checklist complete and filed in `docs/release/`.
  - Staged rollout started and monitored.

### T-095: Portfolio package

- **Description:** Make the project presentable as a portfolio piece: a README with architecture overview and diagram, the ADR index, the learning notes from section 6, a 2-minute demo video, and a short case-study write-up covering trade-offs and what went wrong.
- **External packages:** none (diagram tool of choice).
- **Effort:** 8 hours.
- **Acceptance criteria:**
  - README explains the architecture and how to run the project.
  - At least 8 ADRs are linked from the README.
  - Demo video recorded on the physical device.

---

## 15. Milestones and Timeline

### 15.1 Timeline logic

Planned work is 533 hours (490 build plus 43 learning). At about 22 productive hours per week, that is roughly 24 weeks. The 25% contingency adds about 6 weeks, giving a **planning target of about 30 weeks**.

Weeks below are planning weeks, counted from kickoff. Map them to calendar dates when you start.

### 15.2 Phase schedule

| Phase                    | Planned weeks | Build and learning hours | Cumulative hours | Notes                                                     |
| ------------------------ | ------------- | ------------------------ | ---------------- | --------------------------------------------------------- |
| 0. Foundation            | 1 to 4        | 70                       | 70               | Native setup takes longer than estimated; buffer included |
| 1. Database and backup   | 4 to 12       | 180                      | 250              | Largest phase; restore swap is the hardest item           |
| 2. State machines        | 12 to 14      | 50                       | 300              | Can overlap Phase 3 once T-049 is done                    |
| 3. Notifications         | 14 to 15      | 30                       | 330              |                                                           |
| 4. LLM (BYOK)            | 15 to 18      | 67                       | 397              | Domain work can start during Phase 2                      |
| 5. UI and product        | 18 to 22      | 71                       | 468              | Start screens with fakes as soon as use cases exist       |
| 6. Hardening             | 22 to 23      | 35                       | 503              | Device testing needs the physical device booked           |
| 7. Release and portfolio | 23 to 25      | 30                       | 533              | Play closed test runs for 14 days inside this window      |
| **Contingency**          | **25 to 30**  | **about 122**            |                  | Held for rework, device issues, and interruptions         |

### 15.3 Weekly capacity scenarios

| Scenario                                 | Gross hours per week | Productive hours per week | Weeks for 655 planned hours |
| ---------------------------------------- | -------------------- | ------------------------- | --------------------------- |
| Low (2 h weekdays, 5 h weekends)         | 20                   | 18.5                      | about 35                    |
| Planned (2.5 h weekdays, 5.5 h weekends) | 23.5                 | 22                        | about 30                    |
| High (3 h weekdays, 6 h weekends)        | 27                   | 25.5                      | about 26                    |

### 15.4 Milestones

| Milestone                               | Target week | Gate                                                         |
| --------------------------------------- | ----------- | ------------------------------------------------------------ |
| M1: Native toolchain and database spike | 4           | T-011 decision record written; app runs a query on device    |
| M2: Data safe locally                   | 12          | Contract tests pass; reader independence confirmed on device |
| M3: Backup works end to end             | 12 to 14    | Folder and Drive backups verified manually                   |
| M4: Restore failure matrix approved     | 15          | T-042 self-review complete after cooling-off                 |
| M5: Feature complete                    | 22          | Every in-scope feature usable on device                      |
| M6: Quality gate                        | 23          | T-086 and T-087 pass; T-088 has no open critical finding     |
| M7: Release candidate                   | 24          | Signed AAB passes flows; closed test running                 |
| M8: Public release                      | 25 to 30    | Production access granted; staged rollout started            |

### 15.5 Cadence

- **Weekly:** plan the week on Sunday, review progress on Friday. Keep this to the 1.5 hours in section 2.1.
- **Every two weeks:** a checkpoint against the phase schedule. If a phase is more than 20% over, re-plan scope before continuing.
- **Monthly:** a short retrospective written into `docs/learning/retro.md`. It feeds the portfolio.

---

## 16. Risks and Mitigations

| #   | Risk                                                                            | Impact   | Likelihood               | Mitigation                                                                                    |
| --- | ------------------------------------------------------------------------------- | -------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| R1  | Solo developer burnout or long interruptions                                    | High     | Medium                   | Fixed weekly hours; rest weeks built into contingency; scope can be cut at M5                 |
| R2  | Bare React Native and native build issues take longer than planned              | High     | Medium                   | T-009 and T-010 time-boxed; escalate to community forums after 2 days stuck                   |
| R3  | Restore corrupts data in an interrupted swap                                    | Critical | Low                      | Pre-restore snapshot; failure matrix; device tests in T-087                                   |
| R4  | Storage Access Framework library is unmaintained or incomplete                  | Medium   | Medium                   | Spike T-033 before building; fall back to a user-share flow using the system share sheet      |
| R5  | Google OAuth setup (SHA-1 mismatch, consent screen verification) blocks sign-in | High     | Medium                   | Configure both debug and release SHA-1 early in T-035; start verification paperwork before M7 |
| R6  | Play closed-test requirement delays production access                           | High     | High (if account is new) | Recruit testers during Phase 5; plan the 14-day window in Phase 7                             |
| R7  | Privacy disclosures do not match behaviour                                      | High     | Low                      | T-088 and T-090 cross-check every statement                                                   |
| R8  | Scope creep from the PM role (new features added mid-build)                     | Medium   | High                     | Feature list gated through T-073; new work enters only at the next phase boundary             |
| R9  | No second reviewer, so defects slip through                                     | Medium   | Medium                   | Checklist, cooling-off, CI gates, device tests, decision records                              |
| R10 | Native module upgrades break the build                                          | Medium   | Medium                   | Pinned versions; upgrades only in a dedicated ticket; rebuild steps in `docs/dev-setup.md`    |
| R11 | Learning costs exceed the 43-hour budget                                        | Low      | Medium                   | Learning tickets have concrete outputs; stop when the output is met                           |
| R12 | Snapshot size grows and slows backups                                           | Low      | Medium                   | Retention rule (T-038); benchmark in T-089                                                    |

---

## 17. Post-Launch Backlog

- Incremental sync using a change log instead of whole-file snapshots.
- More backup targets (for example, S3-compatible storage with user-supplied credentials).
- iOS support, once a Mac is available. This would be a new phase with its own estimates.
- Multi-device support, which needs conflict resolution and its own design.
- Features from the feature list that are deferred at T-073.

---

## 18. Definition of Done (every ticket)

A ticket is done when all of these are true:

1. Code is committed through a branch that passes CI (T-004).
2. Unit tests cover the acceptance criteria.
3. Dependency rules pass (T-003).
4. No secret, token, or key appears in code, logs, or error messages.
5. If the ticket is marked [REVIEW] or [SPIKE], the written review or decision record is saved in `docs/adr/` or `docs/learning/`, and the review was done after the 24-hour cooling-off period.
6. Documentation is updated where the ticket asks for it.
7. Acceptance criteria are checked on a device for any ticket that touches native code, storage, notifications, or OAuth.
8. The change is noted in the changelog.
