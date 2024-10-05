import { Descriptions, Spin } from 'antd';
import parse from 'html-react-parser';

import { detailsLayout } from '../../layout/DescriptionLayout';
import { useGetSmsTemplateDetailsQuery } from '../../redux/services/smsTemplate/smsTemplateApi';
import { useDetailsLayout } from '../../utilities/hooks/useDetailsLayout';
import { CustomDescription } from '../Shared/Description/CustomDescription';
import CustomModal from '../Shared/Modal/CustomModal';

const SmsTemplateDetails = ({ id, ...props }) => {
  const { data, isFetching } = useGetSmsTemplateDetailsQuery(
    {
      id,
      params: {
        parent: 1,
        child: 1,
      },
    },
    { skip: !id }
  );

  const details = useDetailsLayout({
    act: data?.act,
    name: data?.name,
    shortcode: data?.shortcode,
    subject: data?.subject,
  });

  return (
    <CustomModal {...props}>
      {isFetching ? (
        <Spin className="my-10 flex w-full items-center justify-center" />
      ) : (
        <div className="space-y-5 pb-5 pr-3 pt-3">
          <CustomDescription title="SMS Template" items={details} />
          <Descriptions {...detailsLayout}>
            <Descriptions.Item label="Body" className="overflow-x-auto">
              <div>{parse(data?.body)}</div>
            </Descriptions.Item>
          </Descriptions>
          <div dangerouslySetInnerHTML={{ __html: data?.body }}></div>
        </div>
      )}
    </CustomModal>
  );
};

export default SmsTemplateDetails;
