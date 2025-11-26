export default function Loader() {
  return (
    <div className="flex items-center justify-center  ">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Loader */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        
        <p className="text-gray-600 font-medium"> Uploading image...</p>
      </div>
    </div>
  );
}
