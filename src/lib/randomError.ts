export function maybeThrowRandomError(probability: number = 0.33): void {
  const isValidProbability = probability >= 0 && probability <= 1;
  const effectiveProbability = isValidProbability ? probability : 0.33;

  if (Math.random() < effectiveProbability) {
    throw new Error(`Randomly injected error (${Math.round(effectiveProbability * 100)}% chance)`);
  }
}


