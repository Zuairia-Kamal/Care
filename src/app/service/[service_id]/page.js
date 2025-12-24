// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useContext } from "react";
// import { useAuth } from "@/context/AuthContext";
// import services from "@/lib/servicesData";

// export default function ServiceDetailPage() {
//   const { service_id } = useParams();
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   const service = services.find((s) => s.id === service_id);

//   if (!service) return <p className="text-center mt-10">Service not found.</p>;

//   const handleBook = () => {
//     if (!user) {
//       router.push(`/login?redirect=/booking/${service.id}`);
//     } else {
//       router.push(`/booking/${service.id}`);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded shadow p-6 md:flex md:space-x-6">
//         <img
//           src={service.image}
//           alt={service.name}
//           className="w-full md:w-1/3 rounded mb-4 md:mb-0 object-cover"
//         />

//         <div className="md:flex-1">
//           <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
//           <p className="text-gray-700 mb-4">{service.description}</p>
//           <p className="text-xl font-semibold text-blue-600 mb-4">
//             Starting from ${service.price} / day
//           </p>

//           <button
//             onClick={handleBook}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Book Service
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import services from "@/lib/servicesData";

export default function ServiceDetailPage() {
  const { service_id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const service = services.find(
    (s) => String(s.id) === String(service_id)
  );

  if (!service) {
    return <p className="text-center mt-10">Service not found</p>;
  }

  const handleBook = () => {
    if (!user) {
      router.push(`/login?redirect=/booking/${service.id}`);
    } else {
      router.push(`/booking/${service.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 md:flex gap-6">
        <img
          src={service.image}
          alt={service.name}
          className="w-full md:w-1/3 rounded object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{service.name}</h1>
          <p className="mb-4 text-gray-600">{service.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            ${service.price} / day
          </p>

          <button
            onClick={handleBook}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
}
