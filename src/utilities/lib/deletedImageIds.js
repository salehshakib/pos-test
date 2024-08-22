export function getMissingUids(fields, values, keyName = 'attachments') {
  const attachmentObject = fields.find((item) => item.name === keyName) || [];

  const valueUids = new Set(values?.[keyName]?.map((item) => item.uid) || []);

  return attachmentObject?.value
    ?.filter((item) => item.uid && !valueUids.has(item.uid))
    .map((item) => item.uid);
}
