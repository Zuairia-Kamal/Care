// import "@/styles/globals.css";
// import Navbar from "@/components/Navbar";
// import { AuthProvider } from "@/context/AuthContext";

// export const metadata = {
//   title: "Care.xyz | Trusted Care Services",
//   description:
//     "Care.xyz provides trusted baby sitting, elderly care, and sick patient care services at home.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50 text-gray-900">
//         <AuthProvider>
//           <Navbar />
//           <main className="min-h-screen">{children}</main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Care.xyz | Trusted Care Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body className="bg-gray-50 text-gray-900"> 
        <AuthProvider>
          <Navbar />      
          <main className="min-h-screen">{children}</main>
          <Toaster position="top-right" />
          <Footer />       
        </AuthProvider>
      </body>
    </html>
  );
}
