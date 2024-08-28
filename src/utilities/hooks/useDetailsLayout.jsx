import { Badge, Image } from 'antd';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

import defaultUser from '../../assets/data/defaultUserImage';
import { useCurrency } from '../../redux/services/pos/posSlice';
import { showCurrency } from '../lib/currency';
import { formatDate } from '../lib/dateFormat';
import { useFormatDate } from './useFormatDate';

const LABEL_SPAN = {
  default: 2,
  fullRow: 4,
};

const IGNORED_KEYS = new Set([
  'id',
  'created_at',
  'updated_at',
  'deleted_at',
  'adjustment_products',
  'purchase_products',
  'sale_products',
  'quotation_products',
]);

const BOOLEAN_KEYS = new Set([
  'is_active',
  'has_stock',
  'has_featured',
  'has_promotion',
  'has_different_price',
  'has_expired_date',
  'has_variants',
  'is_send_email',
  'have_access',
]);

const CURRENCY_KEYS = new Set([
  'price',
  'tax',
  'discount',
  'total',
  'grand_total',
  'paid',
  'due',
  'return_amount',
  'expense',
]);

const FULL_ROW_KEYS = new Set([
  'details',
  'address',
  'attachments',
  'reason',
  'note',
  'description',
  'reference_id',
  'parents',
]);

const formatPhoneNumber = (value) => (value ? `+880 ${value}` : 'N/A');

const renderBadge = (status, text) => (
  <Badge status={status} text={text} key={text} />
);

const getBadgeStatus = (value) => {
  const normalizedValue = value?.toLowerCase();
  return normalizedValue === 'pending' || normalizedValue === 'incomplete'
    ? 'warning'
    : 'success';
};

const renderAttachments = (attachments) => (
  <div className="flex items-center gap-3" key="attachments">
    {attachments.map(({ label, url }) => (
      <Image
        src={url ?? defaultUser}
        alt={label}
        key={url}
        width={200}
        className="object-cover"
      />
    ))}
  </div>
);

const renderValue = (key, value, currency, format) => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value.name || 'N/A';
  }

  switch (key) {
    case 'is_active':
      return renderBadge(
        value?.toString() === '1' ? 'success' : 'default',
        value?.toString() === '1' ? 'Active' : 'Inactive'
      );

    case 'details':
      return value ? (
        <div className="max-h-[30rem] overflow-auto">{parse(value)}</div>
      ) : (
        'N/A'
      );

    case 'phone':
    case 'phone_number':
      return formatPhoneNumber(value);

    case 'attachments':
      return Array.isArray(value) ? renderAttachments(value) : 'N/A';

    default:
      if (key.includes('status') && !key.includes('_status')) {
        return value
          ? renderBadge(getBadgeStatus(value), value)
          : renderBadge('warning', 'Incomplete');
      }

      if (CURRENCY_KEYS.has(key)) {
        return showCurrency(value, currency);
      }

      if (
        key.includes('date') &&
        !key.includes('_update') &&
        !key.includes('_handleUpdate')
      ) {
        return formatDate(value, format);
      }

      if (BOOLEAN_KEYS.has(key)) {
        return value?.toString() === '1' ? 'True' : 'False';
      }

      return !Array.isArray(value) ? value || 'N/A' : null;
  }
};

const capitalizeLabel = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const getItemSpan = (key, nostyle) => {
  if (nostyle) return LABEL_SPAN.default;
  return FULL_ROW_KEYS.has(key) || key.includes('note')
    ? LABEL_SPAN.fullRow
    : LABEL_SPAN.default;
};

export function useDetailsLayout(data, nostyle, ignoreDataKeys = []) {
  const format = useFormatDate();
  const currency = useSelector(useCurrency);
  const combinedIgnoredKeys = new Set([...IGNORED_KEYS, ...ignoreDataKeys]);

  const details = Object.entries(data ?? {}).reduce(
    (acc, [key, value], index) => {
      if (
        combinedIgnoredKeys.has(key) ||
        (key.includes('_id') && key !== 'reference_id')
      ) {
        return acc;
      }

      const item = {
        key: index + 1,
        label: capitalizeLabel(key),
        children: renderValue(key, value, currency, format),
        span: getItemSpan(key, nostyle),
      };

      acc.push(item);
      return acc;
    },
    []
  );

  return details;
}
