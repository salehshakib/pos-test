import { Toaster } from 'react-hot-toast';

import PosLayout from './layout/PosLayout';

function Pos() {
  return (
    <>
      {/* {contextHolder} */}
      <Toaster position="top-right" reverseOrder={false} />
      <PosLayout />
    </>
  );
}

export default Pos;
