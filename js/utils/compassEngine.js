// MindCompass — Compass Scoring Engine

function calculateCompassResult(selectedSymptoms, durationId) {
  const scores = { anxiety: 0, depression: 0, burnout: 0 };
  let hasCrisis = false;

  // Get duration weight
  const durationOption = DURATION_OPTIONS.find(d => d.id === durationId);
  const durationWeight = durationOption ? durationOption.weight : 1;

  // Tally all symptom scores
  const allSymptoms = [
    ...SYMPTOMS.physical,
    ...SYMPTOMS.emotional,
    ...SYMPTOMS.cognitive
  ];

  selectedSymptoms.forEach(id => {
    const symptom = allSymptoms.find(s => s.id === id);
    if (!symptom) return;
    if (symptom.crisis) hasCrisis = true;
    if (symptom.anxiety)    scores.anxiety    += symptom.anxiety * durationWeight;
    if (symptom.depression) scores.depression += symptom.depression * durationWeight;
    if (symptom.burnout)    scores.burnout    += symptom.burnout * durationWeight;
  });

  // Determine primary condition
  const total = scores.anxiety + scores.depression + scores.burnout;
  let primaryCondition = 'wellness';

  if (total > 0) {
    const max = Math.max(scores.anxiety, scores.depression, scores.burnout);
    const threshold = 4;

    // Check if multiple scores are high (mixed)
    const highScores = Object.values(scores).filter(s => s >= threshold);

    if (highScores.length >= 2) {
      primaryCondition = 'mixed';
    } else if (max < threshold) {
      primaryCondition = 'wellness';
    } else if (scores.anxiety === max) {
      primaryCondition = 'anxiety';
    } else if (scores.depression === max) {
      primaryCondition = 'depression';
    } else {
      primaryCondition = 'burnout';
    }
  }

  return {
    condition: primaryCondition,
    scores,
    total,
    hasCrisis,
    selectedCount: selectedSymptoms.length,
    durationId,
    timestamp: new Date().toISOString()
  };
}

function getScorePercentage(score, maxPossible = 30) {
  return Math.min(100, Math.round((score / maxPossible) * 100));
}
