import { createSessionReport } from './session.mjs';
const $ = id => document.getElementById(id);
let startedAt = null;
let elapsedSeconds = null;
$('start').addEventListener('click', () => {
  if (!$('participant').reportValidity() || !$('consent').reportValidity()) return;
  startedAt = performance.now();
  elapsedSeconds = null;
  $('start').disabled = true;
  $('stop').disabled = false;
  $('timer').textContent = 'Sesi berjalan. Waktu dihitung sampai Anda memilih selesai.';
});
$('stop').addEventListener('click', () => {
  elapsedSeconds = Math.round((performance.now() - startedAt) / 1000);
  $('stop').disabled = true;
  $('timer').textContent = `Sesi selesai: ${elapsedSeconds} detik.`;
});
$('session-form').addEventListener('submit', event => {
  event.preventDefault();
  if (startedAt !== null && !$('stop').disabled) {
    $('feedback').textContent = 'Pilih Selesai mencoba sebelum mengunduh.';
    return;
  }
  try {
    const report = createSessionReport({participant:$('participant').value,consent:$('consent').checked,outcome:$('outcome').value,reviewMinutes:$('review-minutes').value,corrections:$('corrections').value,obstacle:$('obstacle').value,printNotes:$('print-notes').value,elapsedSeconds});
    const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));
    const link=document.createElement('a');link.href=url;link.download='teacher-exam-pilot.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('feedback').textContent='Catatan diunduh. Tidak ada data yang dikirim otomatis.';
  } catch(error) { $('feedback').textContent=error.message; }
});
