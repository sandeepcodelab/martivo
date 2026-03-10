import { Heart, Star } from "lucide-react";

export default function ProductCard({ item = {} }) {
  return (
    <div className="overflow-hidden rounded-xl bg-gray-200 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition duration-300 border group">
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={item.url ? item.url : item.thumbnail.url}
          alt={item.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-lg font-semibold tracking-wider">
            View Details
          </span>
        </div>

        {/* Wishlist */}
        <button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full p-2 bg-white/80 hover:bg-gray-300 backdrop-blur-sm"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="size-5 text-gray-500 hover:text-red-500 transition" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-md font-medium group-hover:underline">
          {item.title}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 text-gray-400" />
          </div>

          <span className="text-xs text-gray-500 ml-1">(120)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">{item.salePrice}</span>
          <span className="text-sm text-muted-foreground line-through">
            {item.price}
          </span>
        </div>
      </div>
    </div>
  );
}
