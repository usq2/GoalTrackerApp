# GoalTrackerApp Engine & Core Systems

An offline-first, deterministic goal-tracking application built with React Native. Uses a 4-state Finite State Machine (FSM), Spearman Rank Correlation, and Laplace-smoothed Markov Matrix Exponentiation ($P^7$) to compute success trajectories while enforcing a strict 2-goal active limit.

---

## 🏗 System Architecture

```
GoalTrackerApp/
├── apps/
│   └── mobile/                # React Native (Hermes) application UI & navigation
└── packages/
    └── analytics-core/        # Zero-dependency TypeScript math & FSM package
        ├── src/
        │   ├── fsm.ts         # Deterministic state machine & lookup table
        │   ├── markov.ts      # 4x4 Matrix multiplication & Laplace smoothing
        │   ├── spearman.ts    # Spearman rank correlation (rho)
        │   ├── trendsEngine.ts# Daily check-in analytics pipeline
        │   ├── schemas.ts     # Zod runtime validation contracts
        │   └── index.ts       # Core package exports
        └── package.json

```

---

## ⚡ Core Engine Logic

### 1. FSM Target State Machine

Targets occupy one of four deterministic states (`INITIAL`, `MOMENTUM`, `INERTIA`, `DEAD`). Transitions occur via explicit daily events (`CHECK_IN_PASS`, `CHECK_IN_PARTIAL`, `CHECK_IN_FAIL`, `SYSTEM_DAY_LAPSE`).

```
       ┌─────────────────────────────────────────┐
       │                                         │
       ▼                                         │
┌──────────────┐   85% Adherence   ┌───────────┐ │ (Lapse < 2 days)
│   INITIAL    │ ────────────────> │ MOMENTUM  │─┘
└──────────────┘                   └───────────┘
       │                                 │
       │ < 65% Adherence                 │ < 65% Adherence / 2 consecutive misses
       ▼                                 ▼
┌──────────────┐   4 consecutive   ┌───────────┐
│   INERTIA    │ <──────────────── │   DEAD    │ (Requires qualitative realignment)
└──────────────┘   pass days       └───────────┘

```

- **`MOMENTUM`**: Target challenge scales $+2\%$ daily (capped at $+20\%$).
- **`INERTIA`**: Friction reduction scales $-2\%$ daily (floored at $-20\%$).
- **`DEAD`**: Lockout state triggered after 4 consecutive misses or $<30\%$ adherence. Requires qualitative LLM realignment to reset to `INITIAL`.

---

### 2. Statistical Analytics Engine

- **Markov Matrix Exponentiation ($P^7$):** Maps FSM transition counts to a $4 \times 4$ matrix, applies Laplace smoothing ($\alpha = 1.0$), and computes $P^7 = (P^1)^7$ to predict 7-day state probabilities.
- **Spearman Rank Correlation ($\rho$):** Computes correlation between daily adherence scores ($0.0 - 1.0$) and contextual variables (ordinal stress rating 1–5, HealthKit sleep hours).

$$\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}$$

---

## 💾 Database Schema (SQLite)

```sql
CREATE TABLE targets (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    goal_type TEXT NOT NULL, -- 'STATIC_HABIT' | 'SEQUENTIAL_CURRICULUM'
    current_state TEXT NOT NULL, -- 'INITIAL' | 'MOMENTUM' | 'INERTIA' | 'DEAD'
    consecutive_passes INTEGER DEFAULT 0,
    consecutive_misses INTEGER DEFAULT 0,
    total_logged_days INTEGER DEFAULT 0,
    adherence_rate REAL DEFAULT 1.0,
    scale_multiplier REAL DEFAULT 1.0,
    current_syllabus_pointer INTEGER DEFAULT 1,
    static_rule_json TEXT,
    syllabus_json TEXT
);

CREATE TABLE check_ins (
    id TEXT PRIMARY KEY,
    target_id TEXT NOT NULL,
    logged_date TEXT NOT NULL, -- ISO Date: YYYY-MM-DD
    status TEXT NOT NULL,      -- 'PASS' | 'PARTIAL' | 'FAIL' | 'SYSTEM_LAPSE'
    state_at_checkin TEXT NOT NULL,
    stress_level INTEGER,      -- Ordinal 1-5
    sleep_hours REAL,          -- Passive HealthKit import
    FOREIGN KEY(target_id) REFERENCES targets(id)
);

```

---

## 🚀 Setup & Execution

### Prerequisites

- Node.js $\ge 18$
- npm / pnpm workspace support
- React Native development environment (iOS CocoaPods / Android NDK)

### 1. Install Dependencies

```bash
npm install

```

## run the app

## 🤖 LLM Integration (BYOK)

System interfaces directly with Gemini 1.5 Flash via user-provided API keys:

- **JSON Output Schema Enforcement:** Configured via `responseMimeType: 'application/json'`.
- **Schema Validation:** Raw payloads pass through Zod (`LLMCurriculumResponseSchema`) before DB insertion. Accepts only 30-day sequential step arrays.
