# Local Trends & Analytics Engine Specification

## Overview

The Trend Engine processes raw local telemetry (check-in logs, mood ratings, sleep duration, stress scores) and computes statistical correlations on-device. Pre-calculated statistical insights are passed to the LLM solely for translation into supportive human narratives.

---

## Statistical Methodology

1. **Spearman’s Rank Correlation Coefficient ($\rho$):** Used for non-linear, ordinal 1–5 scale inputs (mood, energy, stress) to eliminate outlier sensitivity.
2. **Pearson Correlation ($r$):** Used for continuous linear metrics (sleep duration, word counts).
3. **Minimum Sample Size:** Correlations fire only after a minimum threshold of 7 to 14 paired data logs.
