import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "India Blood Connect — Find Blood Donors Near You",
  description: "A nationwide network connecting blood donors with those in need across India. Find donors by blood group, location, and availability. Every drop counts — save a life today.",
  keywords: "blood donor, blood donation, India, blood bank, blood request, emergency blood, donor network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
