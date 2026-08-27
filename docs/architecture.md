1. Executive Summary & Core Philosophy
   The objective of this mobile application is to serve as an intentional personal coach for habit formation and high-leverage skill acquisition. Unlike traditional consumer tracking tools that attempt to manage dozens of daily metrics, this system enforces a strict maximum constraint of 2 active focus targets per 30-day block.

The system operates on a zero-infrastructure footprint:

Zero Backend Costs: Data resides entirely on-device and syncs privately to the user's Google Drive (drive.appdata).

Zero API Costs: Execution leverages external LLMs via deep-linking (chatgpt://, claude://) or user-provided keys (Google AI Studio BYOK).

Deterministic Guardrails: Semantic generation (LLM) is strictly decoupled from state evaluation (Local Engine).

2. High-Level System Architecture

┌────────────────────────────────────────────────────────────────────────┐
│ REACT NATIVE APP │
│ │
│ ┌──────────────────────┐ ┌──────────────────────────────┐ │
│ │ UI / Presentation │ │ Local Data Layer │ │
│ │ (Obsidian Dark UI) │ │ (WatermelonDB / SQLite) │ │
│ └──────────┬───────────┘ └──────────────┬───────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ LOCAL DETERMINISTIC ENGINE │ │
│ │ - 4-State Finite State Machine (FSM) │ │
│ │ - Spearman / Pearson Analytics Engine │ │
│ │ - Zod Runtime Schema Hardening & Guardrails │ │
│ └──────────┬─────────────────────────────────────┬───────────────┘ │
└──────────────┼─────────────────────────────────────┼───────────────────┘
│ (State Gate Trigger) │ (Cloud Sync)
▼ ▼
┌──────────────────────────────┐ ┌───────────────────────────────────┐
│ LLM INFERENCE LAYER │ │ PRIVATE CLOUD SYNC │
│ - Deep Link (chatgpt://) │ │ - Google Drive `drive.appdata` │
│ - BYOK (Gemini API) │ │ - Unified react-native-cloud │
└──────────────────────────────┘ └───────────────────────────────────┘

3. The 4-State Finite State Machine (FSM) Engine

The local engine governs state transitions, scaling quantitative targets, and guarding when external LLM inference is triggered.

## State Definitions

| State          | Phase         | Description & Triggers                                                                       | Engine Action                                                                                                                    |
| :------------- | :------------ | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **`INITIAL`**  | Calibration   | Active during the first 7 days of a target or immediately after exiting `DEAD`.              | Target metrics stay static ($0\%$ scaling). Local push notifications and badges run. Exit gate evaluates automatically on Day 8. |
| **`MOMENTUM`** | Overload      | Triggered when rolling 7-day adherence is $\ge 85\%$.                                        | Scales quantitative target by $+2\%$ per cycle up to a maximum ceiling of $+25\%$ (`MAX_SCALE = 1.25`).                          |
| **`INERTIA`**  | De-escalation | Triggered when rolling 7-day adherence falls between $40\%$ and $65\%$.                      | Scales quantitative target by $-2\%$ per cycle down to a minimum floor of $-50\%$ (`MIN_SCALE = 0.50`).                          |
| **`DEAD`**     | Intervention  | Triggered if $4+$ consecutive days are missed OR 7-day rolling adherence drops below $30\%$. | Target metrics freeze. Locks tracking UI, triggers qualitative user feedback prompt, and invokes the LLM for plan realignment.   |

4. Schema Hardening & Abstract Goal Parsing

Abstract or qualitative goals (e.g., "get better at writing") are operationalized at the semantic layer into strict binary tracking contracts using Zod. The local FSM engine tracks execution adherence without evaluating subject matter quality.

5. Analytics & Trend Engine

The Trend Engine calculates mathematical correlations locally over minimum 14-day sample sizes. Pre-computed correlation metrics are passed to the LLM solely for translation into actionable human narrative insights.
