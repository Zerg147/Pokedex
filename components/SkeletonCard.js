export default function SkeletonCard() {
    return (
        <div className="w-72 bg-gray-200 shadow-md rounded-xl animate-pulse">
            <div className="h-80 bg-gray-300 rounded-t-xl"></div>
            <div className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
}
