import { SYMPTOMS, DURATION_OPTIONS } from '@data/symptoms';

export function calculateCompassResult(selectedSymptoms, durationId) {
  const scores = { anxiety: 0, depression: 0, burnout: 0 };
  let hasCrisis = false;

  const durationOption = DURATION_OPTIONS.find(d => d.id === durationId);
  const durationWeight = durationOption ? durationOption.weight : 1;

  const allSymptoms = [
    ...SYMPTOMS.physical,
    ...SYMPTOMS.emotional,
    ...SYMPTOMS.cognitive,
  ];

  selectedSymptoms.forEach(id => {
    const symptom = allSymptoms.find(s => s.id === id);
    if (!symptom) return;
    if (symptom.crisis) hasCrisis = true;
    if (symptom.anxiety)    scores.anxiety    += symptom.anxiety    * durationWeight;
    if (symptom.depression) scores.depression += symptom.depression * durationWeight;
    if (symptom.burnout)    scores.burnout    += symptom.burnout    * durationWeight;
  });

  const total = scores.anxiety + scores.depression + scores.burnout;
  let condition = 'wellness';

  if (total > 0) {
    const max = Math.max(scores.anxiety, scores.depression, scores.burnout);
    const threshold = 4;
    const highScores = Object.values(scores).filter(s => s >= threshold);

    if (highScores.length >= 2) condition = 'mixed';
    else if (max < threshold)   condition = 'wellness';
    else if (scores.anxiety === max)    condition = 'anxiety';
    else if (scores.depression === max) condition = 'depression';
    else condition = 'burnout';
  }

  return {
    condition,
    scores,
    total,
    hasCrisis,
    selectedCount: selectedSymptoms.length,
    durationId,
    timestamp: new Date().toISOString(),
  };
}
