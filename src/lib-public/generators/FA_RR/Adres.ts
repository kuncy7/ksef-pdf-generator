import { Content } from 'pdfmake/interfaces';
import FormatTyp from '../../../shared/enums/common.enum.js';
import { createLabelText, formatText, getKraj, getValue } from '../../../shared/PDF-functions.js';
import { Adres } from '../../types/FaRR.types';

export function generateAdres(adres: Adres): Content[] {
  const result: Content[] = [];

  if (adres?.AdresL1) {
    result.push(formatText(getValue(adres.AdresL1), FormatTyp.Value));
  }
  if (adres?.AdresL2) {
    result.push(formatText(getValue(adres.AdresL2), FormatTyp.Value));
  }
  if (adres?.KodKraju) {
    result.push(formatText(getKraj((getValue(adres.KodKraju) as string) ?? ''), FormatTyp.Value));
  }
  result.push(...createLabelText('GLN: ', adres.GLN));
  return result;
}
