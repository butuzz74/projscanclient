import {modelProducts} from '../config/config';

export const extractFields = (lines: string[]) => {
  const brandRegex = /(nec|optoma|infocus)/i;
  const modelRegex = new RegExp(`\\b(${modelProducts.join('|')})\\b`, 'i');
  const deviceTypeRegex = /(projector|display|screen)/i;
  const serialNumberOptomaRegex = /^Q[A-Z0-9]{14}\d{2}$/;
  const serialNumberInFocusRegex = /^(?=.*\d)[A-Z0-9]{12}$/;
  const manufactoreCountryRegex = /made in ([a-zA-Z\s]+)/i;

  let extractedBrand = '';
  let extractedModel = '';
  let extractedDeviceType = '';
  let extractedSerialNumber = '';
  let extractedManufactoreCountry = '';

  for (const line of lines) {
    if (!extractedBrand && brandRegex.test(line)) {
      extractedBrand = line.match(brandRegex)?.[0] ?? '';
    }

    if (!extractedModel) {
      const newLine = line.replace(/O/g, '0');
      extractedModel = newLine.match(modelRegex)?.[0] ?? '';
    }

    if (!extractedDeviceType && deviceTypeRegex.test(line)) {
      extractedDeviceType = line.match(deviceTypeRegex)?.[0] ?? '';
    }

    if (extractedSerialNumber.length === 0) {
      const index = line.indexOf('Q');
      if (index === -1 || index + 17 > line.length) {
        extractedSerialNumber = '';
      } else {
        const candidate = line.slice(index, index + 17);
        const prefix = candidate.slice(0, 13);
        const suffix = candidate.slice(13).replace(/O/g, '0');
        const correctedCandidate = prefix + suffix;
        extractedSerialNumber = serialNumberOptomaRegex.test(correctedCandidate)
          ? correctedCandidate
          : '';
      }
    }

    if (
      extractedSerialNumber.length === 0 &&
      serialNumberInFocusRegex.test(line)
    ) {
      extractedSerialNumber = line.match(serialNumberInFocusRegex)?.[0] ?? '';
    }

    if (!extractedManufactoreCountry && manufactoreCountryRegex.test(line)) {
      extractedManufactoreCountry =
        line.match(manufactoreCountryRegex)?.[0] ?? '';
    }

    if (
      extractedBrand &&
      extractedModel &&
      extractedManufactoreCountry &&
      extractedDeviceType &&
      extractedSerialNumber
    ) {
      break;
    }
  }

  return {
    brand:
      extractedBrand.charAt(0).toUpperCase() +
      extractedBrand.slice(1).toLowerCase(),
    model: extractedModel.toUpperCase(),
    deviceType:
      extractedDeviceType.charAt(0).toUpperCase() +
      extractedDeviceType.slice(1).toLowerCase(),
    serialNumber: extractedSerialNumber.toUpperCase(),
    manufactureCountry: extractedManufactoreCountry,
  };
};
