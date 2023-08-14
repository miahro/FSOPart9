import diagnoseData from '../../data/diagnoses.ts';
import { DiagnoseEntry } from '../types.ts';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};