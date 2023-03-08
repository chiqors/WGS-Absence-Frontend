const CircleLoading = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-gray-500 rounded-full border-dashed animate-spin"></div>
      <p className="mb-3 text-base text-gray-500">Loading {data}...</p>
    </div>
  );
};

export default CircleLoading;
