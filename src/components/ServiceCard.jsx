import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-3xl border border-blue-100 shadow-md hover:shadow-2xl transition-all duration-500 p-7 flex flex-col hover:-translate-y-2">

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Service Title */}
      <h3 className="text-2xl font-extrabold text-gray-800 mb-3 tracking-tight">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed flex-grow">
        {service.description}
      </p>

      {/* Price Badge */}
      <div className="mt-5">
        <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
          From ${service.price} / day
        </span>
      </div>

      {/* Button */}
      <Link
        href={`/service/${service.id}`}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300"
      >
        View Details
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
