import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config/Config";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/art/${data._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-xl p-4 cursor-pointer overflow-hidden "
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={baseUrl + data.image}
          alt={data.title}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
      </div>

      {/* Text Section */}
      <div className="text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {data.title}
        </h3>
        <p className="text-gray-600 mb-3">{data.artist.artistName}</p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleClick}
            className="w-full bg-[#0DBB56] text-white cursor-pointer text-sm px-4 py-1.5 rounded-sm hover:opacity-90 transition"
          >
            View Art
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
