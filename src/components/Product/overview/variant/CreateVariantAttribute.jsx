import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { CustomSelectButton } from '../../../Shared/Select/CustomSelectButton';
import { VariantCreate } from '../../../Variant/VariantCreate';

export const CreateVariantAttribute = ({ options, isLoading, onSelect }) => {
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);

  const handleOpenSubDrawer = () => {
    setIsSubDrawerOpen(true);
  };

  const handleCloseSubDrawer = () => {
    setIsSubDrawerOpen(false);
  };

  return (
    <>
      <CustomSelectButton
        label={'Variant Attributes'}
        options={options}
        icon={<FaPlus className="text-xl" />}
        onClick={handleOpenSubDrawer}
        isLoading={isLoading}
        name={'attribute_ids'}
        mode="multiple"
        onChange={(value, option) => onSelect(value, option)}
        required={'true'}
      />

      <VariantCreate
        subDrawer={true}
        isSubDrawerOpen={isSubDrawerOpen}
        handleCloseSubDrawer={handleCloseSubDrawer}
      />
    </>
  );
};
