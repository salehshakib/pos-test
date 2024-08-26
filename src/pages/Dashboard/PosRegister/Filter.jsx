import PosFilterComponent from '../../../components/PosRegister/PosFilterComponent';
import { useFilterParams } from '../../../utilities/hooks/useParams';
import PosProducts from './PosProducts';

export const Filter = ({
  products,
  setProducts,
  setFormValues,
  setProductUnits,
  posForm,
}) => {
  const { searchParams, setParams } = useFilterParams();

  return (
    <div className="flex grow">
      <div className="flex w-full flex-col">
        <div>
          <PosFilterComponent setParams={setParams} />
        </div>
        <div
          style={{
            borderRadius: '8px',
          }}
          className="m-4 grow bg-gray-200 shadow-md"
        >
          <PosProducts
            products={products}
            setProducts={setProducts}
            setFormValues={setFormValues}
            setProductUnits={setProductUnits}
            form={posForm}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
};
