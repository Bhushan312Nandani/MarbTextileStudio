import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastContainer from "../ui/ToastContainer";
import CartDrawer from "../ui/CartDrawer";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0B0F19" }}>
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        announcementVisible={announcementVisible}
        onCloseAnnouncement={() => setAnnouncementVisible(false)}
      />

      {/* Main Content Area with dynamic padding matching fixed header height */}
      <main
        className="flex-1 transition-all duration-200"
        style={{ paddingTop: announcementVisible ? "98px" : "64px" }}
      >
        <Outlet />
      </main>

      <Footer />

      {/* Global Interactive Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
