import i18n from 'i18next';
import { Content } from 'pdfmake/interfaces';

import { borderedBox, createPefHeader, createPEFSubHeader } from '../../../shared/functions-pef.js';
import { generateColumns, getTable, getValue } from '../../../shared/PDF-functions.js';
import { ReceiverParty } from '../../types/pef-invoice-corrective.types';
import { createAddress } from './shared/address.js';
import { createContact } from './shared/contact.js';

export function generateReceiverParty(receiverParty: ReceiverParty | undefined): Content[] {
  const result: Content[] = [];

  if (receiverParty && Object.keys(receiverParty).length) {
    const address: Content[] = [];
    const contact: Content[] = [];
    const { PostalAddress, PartyName, Contact } = receiverParty.Party;
    const subHeader = getValue(getTable(PartyName)?.[0]?.Name)?.toString();

    if (Contact) {
      contact.push(createContact({ ...Contact }));
    }
    if (PostalAddress) {
      address.push(createAddress(PostalAddress));
    }

    result.push(
      borderedBox([
        createPefHeader(i18n.t('pef.receiverParty.header')),
        ...(subHeader ? [createPEFSubHeader(subHeader)] : []),
        generateColumns([address, contact]),
      ])
    );
  }

  return result;
}
