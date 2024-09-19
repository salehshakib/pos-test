import toast from 'react-hot-toast';

import logo from '../../assets/data/defaultLogo';

const typeToColor = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
  failed: 'text-red-600',
  error: 'text-red-600',
};

export const openNotification = (type, message) => {
  const colorClass = typeToColor[type] || 'text-gray-600';
  const typeText = type.charAt(0).toUpperCase() + type.slice(1);

  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      aria-live="assertive"
      role="alert"
    >
      <div className="w-96 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img className="h-10 w-10 rounded-full" src={logo} alt="Logo" />
          </div>
          <div className="ml-3 flex-1">
            <span className={colorClass}>{typeText}</span>
            <div className="mt-1 text-sm text-gray-500  overflow-hidden  w-[19rem]">
              {message ?? 'No Message is provided. Task Completed Successfully'}
            </div>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  ));
};
