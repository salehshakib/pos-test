import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import useScanDetection from 'use-scan-detection';

import MainLayout from './layout/MainLayout';
import { setBarcode } from './redux/services/barcode/barcode';

function App() {
  const dispatch = useDispatch();

  const handleBarcodeChange = (barcode) => {
    dispatch(setBarcode(barcode));
  };

  useScanDetection({
    onComplete: handleBarcodeChange,
    minLength: 12,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <MainLayout />
    </>
  );
}

export default App;
