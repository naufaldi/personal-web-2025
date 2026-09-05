import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSessionReport } from '../public/pilot/teacher-exam/session.mjs';
const input = {participant:'Guru-01',consent:true,outcome:'blocked',reviewMinutes:'',corrections:'',obstacle:'Login gagal',printNotes:'',elapsedSeconds:null};
test('missing measurements remain unknown rather than zero',()=>{const report=createSessionReport(input);assert.equal(report.reviewMinutes,null);assert.equal(report.questionsNeedingCorrection,null);assert.equal(report.totalSessionSeconds,null);assert.equal(report.outcome,'blocked');});
test('requires voluntary participation and an actual outcome',()=>{assert.throws(()=>createSessionReport({...input,consent:false}));assert.throws(()=>createSessionReport({...input,outcome:''}));});
test('rejects impossible measurements and preserves valid zero corrections',()=>{assert.throws(()=>createSessionReport({...input,corrections:'-1'}));assert.throws(()=>createSessionReport({...input,corrections:'1.5'}));assert.throws(()=>createSessionReport({...input,reviewMinutes:'invalid'}));assert.equal(createSessionReport({...input,corrections:'0'}).questionsNeedingCorrection,0);});
