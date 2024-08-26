import { PageContainer } from '@ant-design/pro-layout';
import { Button, Checkbox, Form, Select } from 'antd';
import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import CustomForm from '../../../components/Shared/Form/CustomForm';
import CustomModal from '../../../components/Shared/Modal/CustomModal';
import ProductSelect from './ProductSelect';

const PrintBarcode = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({
    product_list: {
      qty: {},
    },
  });
  const [products, setProducts] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [codeModal, setCodeModal] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [labelSize, setLabelSize] = useState({ width: 2, height: 70 });

  const generateBarcode = () => {
    if (products?.length <= 0) {
      toast?.info('Please Select a Product!');
      return;
    }

    const generatedBarcodes = products?.map((product) => {
      const quantity = formValues?.product_list?.qty[product?.id] || 0;
      return {
        name: product.name,
        sku: product.sku,
        selling_price: product?.selling_price,
        symbology: product?.symbology,
        promotion_price: product?.promotion_price,
        quantity,
      };
    });

    setBarcodes(generatedBarcodes);
    setCodeModal(true);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const sizes = [
    { label: '(3 x 1 inches)', value: '2.625x1' },
    { label: '(2 x 1 inches)', value: '4x6' },
    { label: '(1 x 1 inches)', value: '1x1' },
  ];

  const handleLabelSizeChange = (value) => {
    switch (value) {
      case '2.625x1':
        setLabelSize({ width: 2.625, height: 40 });
        break;
      case '4x6':
        setLabelSize({ width: 1.5, height: 50 });
        break;
      case '1x1':
        setLabelSize({ width: 1, height: 20 });
        break;
      default:
        setLabelSize({ width: 2, height: 70 });
    }
  };

  return (
    <PageContainer
      header={{
        title: (
          <div className="border-r-2 border-black py-1 pr-2 text-2xl lg:text-3xl">
            Product
          </div>
        ),
        subTitle: (
          <div className="py-1 text-2xl lg:text-3xl">Print Barcode</div>
        ),
      }}
    >
      <div className="mx-auto mt-10 max-w-7xl">
        <CustomForm form={form} submitBtn={false}>
          <ProductSelect
            formValues={formValues}
            setFormValues={setFormValues}
            products={products}
            setProducts={setProducts}
          />
          <div className="mt-32 flex flex-col items-center justify-center">
            <div>
              <Checkbox onChange={(e) => setShowName(e.target.checked)}>
                Product Name
              </Checkbox>
              <Checkbox onChange={(e) => setShowPrice(e.target.checked)}>
                Price
              </Checkbox>
              <Checkbox onChange={(e) => setShowDiscount(e.target.checked)}>
                Promotional Price
              </Checkbox>
              <Select
                placeholder={'Select a label size'}
                options={sizes}
                className="mt-6 block"
                onChange={handleLabelSizeChange}
              />
            </div>
            <Button
              className="mt-6 px-20"
              size="large"
              onClick={generateBarcode}
            >
              Generate Barcode
            </Button>
            <CustomModal
              openModal={codeModal}
              hideModal={() => setCodeModal(!codeModal)}
            >
              <div className="flex flex-col items-center justify-center py-10">
                <div className="flex items-center gap-4 py-10">
                  <Button className="px-20" size="large" onClick={handlePrint}>
                    Print
                  </Button>
                </div>
                <div ref={componentRef}>
                  {barcodes?.map((barcode, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-3 gap-x-10">
                        {[...Array(barcode?.quantity)]?.map((_, i) => (
                          <div
                            key={i}
                            className="mx-auto mt-10 rounded-lg border border-gray-300 p-3"
                          >
                            <div className="mx-auto flex items-center justify-center gap-4 text-base font-bold">
                              {showName && <div>{barcode?.name}</div>}
                              {showPrice && (
                                <div
                                  className={`${
                                    barcode?.promotion_price &&
                                    showDiscount &&
                                    'text-sm line-through'
                                  }`}
                                >
                                  ${barcode?.selling_price}
                                </div>
                              )}
                              {showDiscount && barcode?.promotion_price && (
                                <div>${barcode?.promotion_price}</div>
                              )}
                            </div>
                            <Barcode
                              value={barcode?.sku}
                              width={labelSize.width}
                              height={labelSize.height}
                              format={barcode?.symbology}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CustomModal>
          </div>
        </CustomForm>
      </div>
    </PageContainer>
  );
};

export default PrintBarcode;
