export function createSessionReport({ participant, consent, outcome, reviewMinutes, corrections, obstacle, printNotes, elapsedSeconds }) {
  if (!consent || !participant.trim() || !obstacle.trim()) throw new Error('Lengkapi kode peserta, persetujuan, dan hambatan.');
  if (!['completed', 'partial', 'blocked'].includes(outcome)) throw new Error('Pilih hasil sesi.');
  const optionalNumber = (value, integer = false) => {
    if (value === '') return null;
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0 || (integer && !Number.isInteger(number))) throw new Error('Isi angka nol atau lebih.');
    return number;
  };
  return { schemaVersion: 1, participantCode: participant.trim(), consent: true, outcome, totalSessionSeconds: elapsedSeconds ?? null, reviewMinutes: optionalNumber(reviewMinutes), questionsNeedingCorrection: optionalNumber(corrections, true), largestObstacle: obstacle.trim(), printNotes: printNotes.trim(), recordedAt: new Date().toISOString(), source: 'participant-entered; not independently verified' };
}
