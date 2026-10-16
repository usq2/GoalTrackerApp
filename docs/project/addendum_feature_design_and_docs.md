# Addendum to Project Plan v2: Feature Design and Documentation

**Applies to:** `project_plan_solo_android_v2.md`
**Adds:** 17 feature design tickets (FD-00 to FD-16, plus FD-99), 12 documentation tickets (DOC-01 to DOC-12)
**Effect:** build hours rise from 490 to 604; planning target rises from about 30 weeks to about 36 weeks

---

## 1. Working Assumptions for Free-Tier AI

The developer uses a free AI tier. The estimates in this addendum assume the following.

1. **AI drafts, the developer decides.** AI helps with first drafts, tables, wording, edge-case brainstorming, and test-case lists. The developer reads every line and decides what is in scope. AI does not decide requirements.
2. **Verification time is included.** Free-tier output needs checking, so drafting time saved is partly spent on verification. These estimates assume no net time saving from AI on design and documentation tickets.
3. **Quota is limited.** Free tiers cap usage per hour or per day. Plan each week with at least one AI-light day. When the quota is exhausted, switch to the checklists in this addendum; do not wait for quota to reset on a critical task.
4. **No AI on security-critical review.** Restore logic (T-042), privacy rules (T-059), and security review (T-088) are checked by hand against the checklists. AI may suggest test cases, but the developer confirms each one.
5. **Prompt log.** Every AI-assisted artefact is recorded in the AI usage log (DOC-12). This keeps the work honest, and it becomes a useful part of the portfolio.
6. **Specs are the source of truth.** Code and tests are checked against the feature specs, not against AI output. If AI suggests behaviour that is not in a spec, the spec is updated first, then the code.

---

## 2. Feature Specification Template

Every feature spec (FD ticket output) follows the same three parts. Each FD ticket below lists these parts in summary. The full spec lives in `docs/features/F-xx-<name>.md` and uses this template.

**Part 1: Description.** One paragraph: what the feature does, for whom, and why it exists.

**Part 2: Scope and User Experience.** In-scope and out-of-scope items, user stories, entry points, screens and states (default, loading, empty, error, success), and the main flow with its error paths. Copy comes from the strings file (DOC-10).

**Part 3: Technical and Behaviour Specification.** Modules and ports involved, data changes (tables and migrations), use case signatures, events published or consumed, state machine references, error codes, behaviour rules (invariants), failure modes, performance and privacy constraints, and test scenarios written as Given / When / Then.

**Status values:** Draft, In review, Approved, Changed. A feature's build tickets may not start until its spec is Approved.

**Change control:** after approval, a change is recorded in the spec's changelog section with a date and reason. Changes that affect data or privacy require a new ADR.

---

## 3. Just-in-Time Gate

A feature's design ticket must be Approved before its first build ticket starts. Each FD ticket below lists the phase where its gate applies.

| Feature design                    | Gate before phase                             |
| --------------------------------- | --------------------------------------------- |
| FD-00, FD-01, FD-02, FD-03, FD-16 | Phase 0 (must be done before T-017 and T-027) |
| FD-04, FD-05, FD-06, FD-07        | Phase 1, before T-034 to T-041                |
| FD-08, FD-09                      | Phase 3                                       |
| FD-10, FD-11, FD-12               | Phase 4                                       |
| FD-99                             | End of Phase 4, before any UI build           |
| FD-13, FD-14, FD-15               | Phase 5, before T-083 and T-077               |

---

## 4. Feature Design Tickets

### FD-00: Feature specification template and conventions

- **Description:** Set up the spec system: the three-part template (section 2), the ID scheme (`F-01` to `F-16`), status values, Given/When/Then style, and the folder `docs/features/`. Write the template file and one example spec to test it.
- **Scope and User Experience:** Not user-facing. Defines how every later spec is written, reviewed, and changed.
- **Technical and Behaviour Specification:** Template lives in `docs/features/_template.md`. Each spec has a header block with ID, status, owner, date, and links to ADRs and tickets. Specs reference error codes by their kernel codes, not by display text.
- **Packages:** none (markdown).
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Template exists and a sample spec built from it reads cleanly to someone outside the project.
  - Every later spec in this addendum can be filled in using only the template.

### FD-01: Entry capture

- **Description:** The user records one entry. A single entry is stored as 2 to 3 linked database rows, saved atomically, and shown as saved on success.
- **Scope and User Experience:**
  - In scope: a Capture screen with the fields from the approved feature list; save button; pending state; success confirmation; the form clears after save; inline validation; a warning when the user leaves with unsaved changes.
  - Out of scope: editing saved entries; attachments; voice input.
  - Field definitions are placeholders until the feature list is supplied (T-073). Mark them `[TBC]` in the spec.
  - Works fully offline. There are no network calls.
- **Technical and Behaviour Specification:**
  - Use case: `saveEntry`. Domain: `Entry.create`. Port: `EntryRepository.save`.
  - One transaction writes the entry row and its child rows, then the Markov and tagged projections (FD-03).
  - Publishes `EntrySaved` once per successful save. State machine: `entryCapture`.
  - Client-generated UUID is the entry id. A second save with the same id is rejected, which protects against double-tap.
  - Timestamps are stored as UTC epoch milliseconds. The display converts to the device time zone.
  - Errors: `VALIDATION_*` for input problems, `STORAGE_WRITE_FAILED` for database failures. The form keeps the user's input when a save fails.
  - Performance target: save latency under 100 ms at p95 on the reference device.
  - Test scenarios: Given valid input, when saved, then exactly 2 to 3 rows exist with the same `entry_id`. Given a failure between child inserts, then zero rows exist and the form still holds the input.
- **Packages:** none beyond those in the plan.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Spec is Approved before T-017 starts.
  - Every error path in the flow has a matching test scenario.
  - Field placeholders are listed in an open-questions section for the PM.

### FD-02: Entry history

- **Description:** The user browses past entries, newest first, and opens one to read it.
- **Scope and User Experience:**
  - In scope: a paged list; tap to open a read-only detail view; empty state with a link to Capture; loading state for each page.
  - Out of scope in v1: editing and deleting entries. Deletion is decided in FD-15.
- **Technical and Behaviour Specification:**
  - Use case reads through `EntryRepository.listRecent(limit, cursor)`.
  - Keyset pagination on `(created_at, id)`, page size 50. No offset pagination.
  - Child rows are fetched with one `IN` query and grouped by `entry_id`. No per-entry query.
  - Reads use the reader connection, never the writer queue.
  - Behaviour rule: an entry saved while the list is open appears at the top after refresh, not automatically.
  - Test scenarios: Given 120 entries, when the user scrolls to the end, then pages 2 and 3 load with no duplicates. Given zero entries, then the empty state is shown.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Spec Approved before T-076.
  - Query plan for the paged read uses the index (checked with `EXPLAIN QUERY PLAN`).

### FD-03: Trend data (Markov transitions and tagged feed)

- **Description:** Derived data built from entries as they are saved. The user sees a short summary of their patterns in the Analysis tab. No network call is involved.
- **Scope and User Experience:**
  - In scope: an "Your patterns" summary on the Analysis screen showing the top transitions with counts, and the tag distribution, for a chosen period.
  - Out of scope: charts beyond simple bars; predictions; exporting the raw tables.
- **Technical and Behaviour Specification:**
  - State is the entry's tag (from the approved feature list). A transition is recorded between consecutive entries in the same stream.
  - The first entry in a stream writes only the cursor, never a transition.
  - All projection writes happen inside the `saveEntry` transaction (FD-01).
  - A `rebuildProjections()` function recomputes all derived tables from the entries table. It is used after restore, and its output must equal the incremental result.
  - Behaviour rule: derived tables are never edited by hand, and never read by the writer path except through the cursor.
  - Test scenarios: Given the sequence A, B, A, B, then A to B = 2 and B to A = 1. Given a rebuild after the same sequence, then the counts match exactly.
- **Packages:** none.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Rebuild equals incremental for a fixture of 1,000 generated entries.
  - Spec Approved before T-023 starts.

### FD-04: Backup to Google Drive

- **Description:** The user signs in with Google and backs up the database to a hidden, app-private folder in their Drive.
- **Scope and User Experience:**
  - In scope: a Google Drive section in Backup settings with Sign in, Sign out, Back up now, and a list of backups with dates and sizes; a clear explanation that the app can see only its own backup files.
  - Out of scope: browsing the user's other Drive files; shared folders; choosing a Drive folder.
  - Sign-out does not delete backups. A separate checkbox offers to delete them too.
- **Technical and Behaviour Specification:**
  - Scope: `drive.appdata` only. Access tokens come from the sign-in library. No client secret in the app.
  - Upload: multipart for files under 5 MB, resumable upload above that.
  - File name: `entries-<UTC timestamp>-v<schema>-<first 8 hex of SHA-256>.sqlite`.
  - After upload, read back the Drive `md5Checksum` and compare with a locally computed value. Mismatch is `STORAGE_VERIFY_FAILED`.
  - Offline behaviour: the backup fails with `NETWORK_UNAVAILABLE` and is retried at the next policy trigger (FD-06). It is not queued in the background.
  - Errors: `AUTH_REQUIRED`, `QUOTA_EXCEEDED`, `NETWORK_UNAVAILABLE`, `NOT_FOUND`.
  - Test scenarios: Given an expired token, when backing up, then one refresh is attempted and the upload succeeds. Given a 403 quota error, then no retry happens and the user sees the quota message.
- **Packages:** `@react-native-google-signin/google-signin`.
- **Effort:** 6 hours.
- **Acceptance criteria:**
  - Spec Approved before T-035.
  - The consent screen shows only the appdata scope on a test account.

### FD-05: Backup to a user-chosen folder (Storage Access Framework)

- **Description:** The user picks a folder on their device, such as one in a cloud app they already use, and backups are written there.
- **Scope and User Experience:**
  - In scope: a "Choose folder" action; the chosen folder's name shown in settings; a re-pick prompt if access is lost.
  - Out of scope: cloud-specific integrations; backups from other devices.
- **Technical and Behaviour Specification:**
  - Persist the folder URI permission so it survives restarts. If the permission is revoked, the adapter returns `FOLDER_ACCESS_LOST`.
  - File name follows the same pattern as FD-04.
  - Listing only returns files whose names match the backup pattern. Other files in the folder are never touched.
  - Picker cancel returns a typed `CANCELLED` result, not an error.
  - Test scenarios: Given the user cancels the picker, then the previous folder setting is unchanged. Given the folder is removed, then the next backup shows the re-pick prompt.
- **Packages:** library chosen in T-033.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Spec Approved before T-034.
  - Tested on a physical device with one third-party cloud provider's folder.

### FD-06: Automatic backup policy and retention

- **Description:** Decides when a backup runs and how many backups are kept.
- **Scope and User Experience:**
  - In scope: a frequency setting (manual, daily, weekly); "Keep last N" with a default of 10 and a range of 3 to 30; the last backup time and the next due time; a note that backups run when the app is opened, not in the background.
  - Out of scope: background jobs in v1. This is a deliberate decision recorded as an ADR.
- **Technical and Behaviour Specification:**
  - Triggers: app comes to foreground (`AppState` active) and the policy says due; or the user taps Back up now.
  - Due rules are pure functions in `backupPolicy.ts` (T-038).
  - Single-flight lock: only one backup or restore runs at a time. A trigger during a run is dropped, not queued.
  - Retention applies only after the new backup is confirmed in the target's list (T-040).
  - Test scenarios: Given the last backup was 25 hours ago and frequency is daily, when the app is foregrounded, then a backup runs. Given a backup is already running, when a second trigger fires, then it is dropped and logged.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Spec Approved before T-038.
  - ADR for "no background backups in v1" is written and linked.

### FD-07: Restore

- **Description:** The user restores the app's data from a chosen backup. Restore replaces current data, so it requires clear confirmation and is recoverable if it fails.
- **Scope and User Experience:**
  - In scope: a list of backups with metadata (date, entry count, schema version); selecting one shows a comparison of its entry count against the current count; an explicit confirmation checkbox and Restore button; a progress screen; a success or failure result.
  - Failure message when rollback happened: "Your data was not changed."
  - Newer-schema backups show "Update the app to restore this backup" and cannot be selected.
  - Out of scope: partial restore; merging two databases.
- **Technical and Behaviour Specification:**
  - Sequence: download to staging, verify (hash and `integrity_check`), migrate forward if older, close connections, write a pre-restore snapshot, swap, reopen, run integrity check.
  - Any failure after the swap restores the pre-restore snapshot and reports `RESTORE_ROLLED_BACK`.
  - The pre-restore snapshot is kept for 7 days in the cache directory, then removed by T-031.
  - Mutual exclusion: restore cannot start while a backup runs, and backups are blocked during restore.
  - Progress is saved to a JSON file outside the live database (T-051). If the app is killed mid-restore, the next launch reads the file and shows the outcome.
  - The restore state machine requires a `CONFIRM` event before staging (T-047).
  - Test scenarios: Given a snapshot with a newer schema, then no file is touched and the update message appears. Given the app is killed after the swap, then on relaunch the pre-restore snapshot is in place and the user sees the rollback message.
- **Packages:** `react-native-nitro-sqlite`, `react-native-fs`.
- **Effort:** 7 hours.
- **Acceptance criteria:**
  - Spec Approved before T-041.
  - Failure matrix in the spec matches the device test results in T-087.

### FD-08: Daily reminder

- **Description:** A once-a-day reminder to log an entry, at a time the user chooses, that is skipped on days the user has already logged.
- **Scope and User Experience:**
  - In scope: on/off toggle; time picker; quiet hours; plain text such as "Time to add today's entry."
  - Out of scope: reminders with personal content in the text.
- **Technical and Behaviour Specification:**
  - Skip logic is implemented by rescheduling. Each successful save cancels today's reminder and schedules tomorrow's at the chosen time, adjusted for quiet hours.
  - Scheduling uses Notifee timestamp triggers. Inexact timing is acceptable.
  - Turning the toggle off cancels the scheduled reminder. Changing the time reschedules it.
  - Behaviour rule: the notification text never contains entry data.
  - Test scenarios: Given a save at 09:00 with a reminder set for 20:00, then tomorrow's reminder is scheduled and today's is cancelled. Given quiet hours 22:00 to 07:00, when the reminder time is 23:00, then it is moved to 07:00.
- **Packages:** `@notifee/react-native`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Spec Approved before T-055.
  - Verified on a physical device with the app closed.

### FD-09: Backup and analysis outcome notifications

- **Description:** Short notifications that report the outcome of a backup or an analysis run, so the user knows without opening the app.
- **Scope and User Experience:**
  - In scope: toggles per type; success and failure messages; tapping opens the relevant screen.
  - Out of scope: notifications for every save.
- **Technical and Behaviour Specification:**
  - Subscribes to `BackupCompleted`, `BackupFailed`, and `AnalysisCompleted`.
  - Text comes from the message catalogue (FD-16). No stack traces, tokens, file paths, or entry data.
  - Deduplication: the same event type within 60 seconds posts once.
  - Channels: backup outcomes and analysis results (T-054).
  - Test scenarios: Given two `BackupFailed` events within 30 seconds, then one notification is posted. Given the analysis toggle is off, then no notification is posted on `AnalysisCompleted`.
- **Packages:** `@notifee/react-native`.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Spec Approved before T-056.
  - Text reviewed against FD-16 for consistency.

### FD-10: Bring-your-own-key management

- **Description:** The user adds, validates, views (masked), and removes an API key for one of the supported providers. The key is stored only on the device.
- **Scope and User Experience:**
  - In scope: provider choice (Anthropic, OpenAI, Gemini); paste field with secure text entry; validation step; masked display showing the last 4 characters; remove action; a plain explanation that requests go directly from the phone to the provider.
  - Out of scope: key sharing; a shared key from the developer; viewing a full key after saving.
- **Technical and Behaviour Specification:**
  - Storage: Android Keystore through `react-native-keychain`, one entry per provider.
  - A key is saved only after `validateKey` succeeds (T-069).
  - Removing a key also revokes consent for that provider (FD-12).
  - The key never appears in logs, errors, `analysis_runs`, analytics, or the UI after saving.
  - Errors: `AUTH_INVALID_KEY`, `NETWORK_UNAVAILABLE`. These show different messages.
  - Test scenarios: Given an invalid key, then nothing is saved. Given the user removes a key, then the next analysis is blocked and the consent record is revoked.
- **Packages:** `react-native-keychain`.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Spec Approved before T-061.
  - Test confirms the key is absent from every log call and error message.

### FD-11: Trend analysis with an LLM

- **Description:** The user asks a provider to analyse their aggregated patterns. Before anything is sent, the user sees the exact payload.
- **Scope and User Experience:**
  - In scope: choose a period (default last 30 days); a "What will be sent" view showing the exact redacted payload; consent confirmation (FD-12); run; progress with cancel; result with sections, provider, model, and prompt version; a list of past runs.
  - Out of scope: streaming output; follow-up chat; raw entry text (unless a later feature adds per-request opt-in).
- **Technical and Behaviour Specification:**
  - Use case: `analyzeTrends`. Order: consent check, read aggregates through `TrendFeed`, redact (T-059), build prompt (T-063), call `ModelClient`, validate with Zod (T-071), store in `analysis_runs`, publish `AnalysisCompleted`.
  - Payload size cap of 8 KB. Larger aggregates are summarised before sending.
  - Timeout 60 seconds. Cancel aborts the request.
  - Auth errors are not retried. Rate limits show the provider's `Retry-After` time.
  - Invalid response: `INVALID_RESPONSE`. Raw text is not stored.
  - Stored result includes `prompt_version` and `model`.
  - Test scenarios: Given no consent, then no network call is made. Given the payload preview, then it is byte-equal to the payload sent to the fake client.
- **Packages:** none beyond `zod` and `fetch`.
- **Effort:** 7 hours.
- **Acceptance criteria:**
  - Spec Approved before T-064.
  - Preview and sent payload are verified equal in a test.

### FD-12: Consent and data-sharing controls

- **Description:** The user gives and revokes permission, per provider, for sending aggregated data. Consent is recorded.
- **Scope and User Experience:**
  - In scope: a consent screen per provider; a description of exactly what is sent; default is off; revoke button; a history of grant and revoke events with dates.
  - Out of scope: consent for any other purpose.
- **Technical and Behaviour Specification:**
  - Record: `provider`, `scope_version`, `granted_at`, `revoked_at`, stored in `app_meta` as JSON.
  - `scope_version` increases whenever the payload definition changes. A changed version requires new consent.
  - Revoking consent blocks the next analysis immediately.
  - Test scenarios: Given a payload change that bumps `scope_version`, then the previous consent is treated as absent. Given consent is revoked during a run, then the run is cancelled before the request is sent.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Spec Approved before T-062.
  - ADR records the decision to store consent in `app_meta` rather than a table.

### FD-13: First-run onboarding

- **Description:** A short introduction to the app's local-first design, backup, notifications, and optional analysis. Every optional step can be skipped.
- **Scope and User Experience:**
  - In scope: three or four screens; skip at any point; no permission prompts inside onboarding unless the user taps an action; ends at Capture; can be replayed from Settings.
  - Out of scope: account creation; sign-in.
- **Technical and Behaviour Specification:**
  - Completion flag `onboarding_completed` stored in `app_meta`.
  - No network calls during onboarding.
  - Permission requests happen in the feature screens, not in onboarding.
  - Test scenarios: Given first launch, then onboarding is shown. Given the user skips, then the flag is set and Capture opens.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Spec Approved before T-083.
  - Onboarding can be completed in under 60 seconds in a usability walkthrough.

### FD-14: Settings and appearance

- **Description:** A settings area that groups backup, notifications, analysis, appearance, and about information.
- **Scope and User Experience:**
  - In scope: sections for Backup, Notifications, Analysis, Appearance (system, light, dark), Data, and About (app version, privacy policy link, open-source licences).
  - Out of scope: account settings; cloud settings beyond backup.
- **Technical and Behaviour Specification:**
  - Appearance preference is stored in `app_meta` and applied at launch.
  - App version comes from the native build config, not hard-coded.
  - Open-source licences are generated at build time using `license-checker` and bundled as a file.
  - Test scenarios: Given the system theme changes while the preference is "system", then the app follows it without restart.
- **Packages:** `license-checker` (build-time, dev dependency).
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Spec Approved before T-077 and T-079.
  - Licence list in the built app matches the dependency list.

### FD-15: Delete all local data (proposed, needs PM approval)

- **Description:** A way for the user to erase everything the app stores on the device. This feature is proposed and is not in the current plan until the PM approves it.
- **Scope and User Experience:**
  - In scope: a Data section in Settings; a warning that the action is permanent; two-step confirmation; an option to keep or delete remote backups separately.
  - Out of scope: partial deletion of entries (see FD-02).
- **Technical and Behaviour Specification:**
  - Order matters: block if a backup or restore is running; close connections; delete the database and its `-wal` and `-shm` files; delete the pre-restore snapshots and cache; clear keychain entries for every provider; clear `app_meta`; reset onboarding.
  - After deletion, verify that no database file remains. Failure is reported with the list of files that could not be removed.
  - Test scenarios: Given a restore is running, then deletion is blocked with a clear message. Given the user confirms, then the database files and keychain entries are gone.
- **Packages:** `react-native-fs`, `react-native-keychain`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - PM decision recorded in the spec header before the build ticket starts.
  - Verified on a device by checking the app's data directory after deletion.

### FD-16: Error and failure message catalogue

- **Description:** One catalogue mapping every error code to a user-facing title, explanation, and next action. Every feature uses it, so messages are consistent.
- **Scope and User Experience:**
  - Tone rules: plain language, no blame, no technical jargon, one sentence of explanation, one clear action.
  - Never show a stack trace, token, file path, or raw provider message.
  - Each entry has: title, explanation, action label, and the screen to go to.
- **Technical and Behaviour Specification:**
  - Catalogue file `src/shared/messages/catalogue.ts` keyed by the kernel error codes.
  - A test fails if any error code in the kernel has no catalogue entry.
  - Messages are read from the strings file (DOC-10), not hard-coded.
  - Test scenarios: Given an error code not in the catalogue, then the test suite fails.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Every error code listed in the feature specs F-01 to F-15 has an entry.
  - Catalogue test runs in CI.

### FD-99: Specification consistency review

- **Description:** A single pass over all approved specs to find contradictions, duplicated error codes, inconsistent event names, mismatched screen names, and open questions.
- **Scope and User Experience:** Internal only. Output is a list of changes and open questions for the PM.
- **Technical and Behaviour Specification:**
  - Check event names against `shared/kernel/events.ts`.
  - Check every error code against the catalogue (FD-16).
  - Check every screen name against the navigation route file (T-012).
  - Check every feature against the phase gate table (section 3).
  - Output: `docs/features/REVIEW-<date>.md` with a status for each finding.
- **Packages:** none.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Zero open contradictions in the specs.
  - Open questions are listed in one place for the PM.

---

## 5. Documentation Tickets

### DOC-01: Documentation structure and templates

- **Description:** Set up the docs tree and templates so every document type has a known home.
- **Scope:** Structure: `docs/adr/`, `docs/features/`, `docs/learning/`, `docs/design/`, `docs/release/`, `docs/user-guide/`, `docs/dev-setup.md`, `docs/testing.md`, plus the README at the root.
- **Packages:** `markdownlint-cli2`.
- **Effort:** 2 hours.
- **Acceptance criteria:**
  - Every folder has a README stating its purpose.
  - Markdown lint passes in CI.

### DOC-02: Project README

- **Description:** The front page of the project, written for a visitor (recruiter or future contributor) and for the developer.
- **Scope:** What the app does; the architecture summary and diagram link; how to build and run on Android; how to run tests; the ADR index; screenshots; licence; a "what I learned" link.
- **Packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - A new developer can build and run the app from the README alone on a clean machine.
  - Every link in the README resolves.

### DOC-03: Architecture overview and diagrams

- **Description:** A written overview of the hexagonal layers, the four modules, the composition root, and the data flow for a save and a backup.
- **Scope:** One overview document with two or three diagrams (layers, module boundaries, save and backup sequences). Diagrams are kept as text sources, such as Mermaid, so they stay editable.
- **Packages:** none (Mermaid in markdown).
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Diagrams match the folder structure and dependency rules (T-003).
  - Reviewed against one real save flow end to end.

### DOC-04: Port and API reference

- **Description:** Reference documentation for every port and public use case, generated from code comments.
- **Scope:** TSDoc comments on every port and use case in `domain/` and `application/`. Generated HTML or markdown output committed under `docs/api/`.
- **Packages:** `typedoc`.
- **Effort:** 4 hours.
- **Acceptance criteria:**
  - Every port in `domain/ports/` has a TSDoc summary and at least one example.
  - Generation runs as a script and the output is current.

### DOC-05: ADR process and index

- **Description:** A lightweight process for recording architecture decisions, and an index that links them.
- **Scope:** ADR template (context, decision, consequences, status); numbering scheme; an index in `docs/adr/README.md`. Decisions already made (bare React Native, NitroSQLite, no background backup, consent in `app_meta`) are written up as ADRs.
- **Packages:** none.
- **Effort:** 2 hours.
- **Acceptance criteria:**
  - At least 8 ADRs exist by the end of Phase 1, as required by DOC-01 and T-095.

### DOC-06: User guide

- **Description:** Instructions for the end user, written as help content for the app and as markdown in `docs/user-guide/`.
- **Scope:** Getting started; logging an entry; reading history; backup and restore, including what each does; notifications; optional analysis with your own key, including what is sent; privacy summary; troubleshooting table keyed to the error catalogue (FD-16).
- **Packages:** none.
- **Effort:** 5 hours.
- **Acceptance criteria:**
  - Every user-facing error in FD-16 has a troubleshooting entry.
  - A tester can restore a backup using only the guide.

### DOC-07: Testing guide

- **Description:** How the test layers work and how to run each one.
- **Scope:** Unit tests with fakes; contract tests against the NitroSQLite mock; device tests; Maestro flows; failure injection; coverage expectations; what must be tested on a physical device.
- **Packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Each command in the guide runs as written on a clean checkout.

### DOC-08: Changelog and versioning policy

- **Description:** How versions are numbered and how changes are recorded.
- **Scope:** Semantic versioning rules for the app; schema version separate from app version; `CHANGELOG.md` format (Keep a Changelog style); the rule that schema changes must be recorded with the migration number.
- **Packages:** none.
- **Effort:** 2 hours.
- **Acceptance criteria:**
  - Policy document exists and the first changelog entry follows it.

### DOC-09: Release notes and store listing template

- **Description:** A template for release notes and the store listing text.
- **Scope:** Sections for user-visible changes, fixes, known issues, and data notes (especially any schema change, with its backup advice).
- **Packages:** none.
- **Effort:** 1 hour.
- **Acceptance criteria:**
  - Used for the first release (T-094).

### DOC-10: Microcopy and strings file

- **Description:** All user-facing text in one file, so wording is consistent and reviewable.
- **Scope:** `src/ui/strings/en.ts`, keyed by screen and purpose. Covers labels, button text, empty states, confirmations, and catalogue messages (FD-16).
- **Packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - No hard-coded user-facing string in `ui/` (checked by a lint rule or search in CI).
  - Every key used in the app exists in the file.

### DOC-11: Learning notes consolidation and retrospective

- **Description:** Bring the learning notes and monthly retrospectives into a readable set for the portfolio.
- **Scope:** Index of learning notes from section 6 of plan v2; a summary of what was learned, what was harder than expected, and what was done differently; links to the ADRs each learning note supported.
- **Packages:** none.
- **Effort:** 3 hours.
- **Acceptance criteria:**
  - Each learning ticket L-01 to L-08 links to its output.
  - Summary is readable in under 10 minutes.

### DOC-12: AI-assisted development log and policy

- **Description:** A record of how free-tier AI was used, and the policy that governs it.
- **Scope:** Policy (section 1 of this addendum). Log in `docs/ai-usage-log.md` with one row per AI-assisted artefact: date, ticket, tool, what was produced, what was changed by hand, and whether the output was verified.
- **Packages:** none.
- **Effort:** 2 hours to set up, plus about 2 minutes per AI session to log.
- **Acceptance criteria:**
  - Log has at least one row for every FD and DOC ticket completed.
  - Each row records what was changed by hand. Rows that say "accepted as is" are reviewed against the spec before merge.

---

## 6. Impact on Totals

### 6.1 Hours added

| Group               | Tickets               | Build hours added |
| ------------------- | --------------------- | ----------------- |
| Feature design (FD) | FD-00 to FD-16, FD-99 | 80                |
| Documentation (DOC) | DOC-01 to DOC-12      | 34                |
| **Total added**     | 29 tickets            | **114**           |

### 6.2 Updated totals

| Item                             | Plan v2 | With addendum |
| -------------------------------- | ------- | ------------- |
| Build hours                      | 490     | 604           |
| Learning hours                   | 43      | 43            |
| Planned hours (build + learning) | 533     | 647           |
| Contingency (25% of build)       | 122     | 151           |
| **Planning total**               | **655** | **798**       |
| Tickets                          | 95      | 124           |

### 6.3 Updated timeline

At 22 productive hours per week:

- Planned work of 647 hours takes about **29.4 weeks**.
- With contingency, the planning target is about **36 weeks**.

| Scenario | Productive hours per week | Weeks for 798 planned hours |
| -------- | ------------------------- | --------------------------- |
| Low      | 18.5                      | about 43                    |
| Planned  | 22                        | about 36                    |
| High     | 25.5                      | about 31                    |

### 6.4 Updated phase schedule

Feature design and documentation tickets are placed in the phase that needs them (section 3 and the tables above).

| Phase                    | Planned weeks | Hours this phase | Cumulative | Added in this addendum                                                       |
| ------------------------ | ------------- | ---------------- | ---------- | ---------------------------------------------------------------------------- |
| 0. Foundation            | 1 to 5        | 100              | 100        | FD-00, FD-01, FD-02, FD-03, FD-16, DOC-01, DOC-05, DOC-08, DOC-12 (30 hours) |
| 1. Database and backup   | 5 to 14       | 209              | 309        | FD-04, FD-05, FD-06, FD-07, DOC-03, DOC-04 (29 hours)                        |
| 2. State machines        | 14 to 17      | 50               | 359        | none                                                                         |
| 3. Notifications         | 17 to 18      | 36               | 395        | FD-08, FD-09 (6 hours)                                                       |
| 4. LLM (BYOK)            | 18 to 22      | 87               | 482        | FD-10, FD-11, FD-12, FD-99 (20 hours)                                        |
| 5. UI and product        | 22 to 26      | 90               | 572        | FD-13, FD-14, FD-15, DOC-06, DOC-10 (19 hours)                               |
| 6. Hardening             | 26 to 28      | 38               | 610        | DOC-07 (3 hours)                                                             |
| 7. Release and portfolio | 28 to 30      | 37               | 647        | DOC-02, DOC-09, DOC-11 (7 hours)                                             |
| **Contingency**          | **30 to 37**  | **about 151**    |            | Held for rework, device issues, and interruptions                            |

### 6.5 Updated milestones

| Milestone                                                      | Target week | Change from plan v2                                          |
| -------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| M1: Native toolchain, database spike, and first specs approved | 5           | Moved from week 4; specs for entry capture and history added |
| M2: Data safe locally                                          | 14          | Moved from week 12                                           |
| M3: Backup works end to end                                    | 14 to 17    | Moved from weeks 12 to 14                                    |
| M4: Restore failure matrix approved                            | 18          | Moved from week 15                                           |
| M5: Feature complete                                           | 26          | Moved from week 22                                           |
| M6: Quality gate                                               | 28          | Moved from week 23                                           |
| M7: Release candidate                                          | 29          | Moved from week 24                                           |
| M8: Public release                                             | 30 to 37    | Moved from weeks 25 to 30                                    |

---

## 7. Risks Added by This Addendum

| #   | Risk                                                                       | Impact | Likelihood | Mitigation                                                                                                    |
| --- | -------------------------------------------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------- |
| R13 | Free-tier AI quota runs out during a critical design week                  | Medium | High       | AI-light days in the weekly plan; checklists in this addendum work without AI                                 |
| R14 | AI-drafted specs contain plausible but wrong behaviour                     | High   | Medium     | Specs approved by the developer after reading each line; tests written from specs, not from AI output         |
| R15 | Feature list arrives late and entry fields change after specs are approved | Medium | High       | FD-01 and FD-02 keep field definitions as `[TBC]`; a change goes through the spec change rule (section 2)     |
| R16 | Documentation falls behind code                                            | Medium | High       | Documentation is a phase-end gate; DOC-12 log entries are checked at each milestone                           |
| R17 | Design work expands beyond its estimate                                    | Medium | Medium     | Each FD has a fixed set of parts (section 2); anything beyond goes into the open-questions list, not the spec |

---

## 8. Definition of Done additions

In addition to the Definition of Done in plan v2, a feature build ticket is done only when:

1. Its feature spec is Approved, with the status and date in the header.
2. Every test scenario listed in the spec has a passing test.
3. Every error code used by the feature has an entry in the message catalogue (FD-16).
4. Any change made during implementation is recorded in the spec's changelog section.
5. Any AI-assisted artefact is logged in DOC-12.
