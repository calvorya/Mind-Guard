export function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[320px] bg-gradient-to-tr from-blue-50 via-white to-blue-100 rounded-3xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>

        <span className="text-blue-600 font-semibold tracking-widest text-lg">درحال بارگذاری…</span>

        <span className="text-gray-500 text-sm">لطفاً شکیبا باشید</span>
      </div>
    </div>
  );
}
