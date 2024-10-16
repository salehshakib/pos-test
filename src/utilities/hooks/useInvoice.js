import { useGetGeneralSettingsQuery } from '../../redux/services/settings/generalSettings/generalSettingsApi';
import { cleanHtmlData } from '../lib/cleanHtml';

export const useInvoice = () => {
  const params = {
    child: 1,
  };

  const { data } = useGetGeneralSettingsQuery(params);

  return {
    a4_invoice: cleanHtmlData(data?.pos_setting[0]?.a4_invoice),
    thermal_invoice: cleanHtmlData(data?.pos_setting[0]?.thermal_invoice),
  };
};
