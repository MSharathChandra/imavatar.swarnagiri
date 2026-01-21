import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./globalComponents/Navbar.jsx";
import Footer from "./globalComponents/Footer.jsx";
import AnnouncementBar from "./globalComponents/AnnouncementBar";

import HomeLayout from "./pages/home/HomeLayout";
import HomeTab from "./pages/home/HomeTab";
import ServicesTab from "./pages/home/ServicesTab";
import DonationsTab from "./pages/home/DonationsTab";
import DonationSummaryPage from "./pages/home/DonationsTab/DonationSummaryPage.jsx";
import DonationPaymentPage from "./pages/home/DonationsTab/DonationPaymentPage.jsx";
import DonationTicketPage from "./pages/home/DonationsTab/DonationTicketPage.jsx";
import EventsTab from "./pages/home/EventsTab";
import StoreTab from "./pages/home/StoreTab";
import FaqsTab from "./pages/home/FaqsTab";
import TicketFlow from "./pages/Common/TicketFlow.jsx";

function Layout({ children }) {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <AnnouncementBar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomeLayout />
            </Layout>
          }
        >
          <Route index element={<HomeTab />} />
          {/* <Route path="services" element={<ServicesTab />} /> */}
          <Route path="/donations" element={<DonationsTab />} />
          <Route path="/donations/summary" element={<DonationSummaryPage />} />
          <Route path="/donations/payment" element={<DonationPaymentPage />} />
          <Route path="/donations/ticket" element={<DonationTicketPage />} />

          <Route path="events" element={<EventsTab />} />
          <Route path="store" element={<StoreTab />} />
          <Route path="faqs" element={<FaqsTab />} />
          <Route path="services" element={<ServicesTab />} />
          <Route
            path="services/book/:type/:ticketId"
            element={<TicketFlow />}
          />
        </Route>

        {/* keep your other non-tab routes here if needed */}
      </Routes>
    </Router>
  );
}
