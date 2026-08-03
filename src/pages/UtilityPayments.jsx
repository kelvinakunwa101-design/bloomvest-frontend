import { useState } from "react";
import {
  FaMobileAlt,
  FaWifi,
  FaBolt,
  FaTv,
  FaGlobe,
  FaDice,
} from "react-icons/fa";

import PageLayout from "../components/layout/PageLayout";
import UtilityPaymentModal from "../components/utilities/UtilityPaymentModal";

const services = [
  {
    title: "Airtime",
    icon: <FaMobileAlt size={35} />,
    color: "#2563EB",
    description: "Recharge any mobile network",
  },
  {
    title: "Data",
    icon: <FaWifi size={35} />,
    color: "#10B981",
    description: "Purchase internet bundles",
  },
  {
    title: "Electricity",
    icon: <FaBolt size={35} />,
    color: "#F59E0B",
    description: "Pay electricity bills",
  },
  {
    title: "Cable TV",
    icon: <FaTv size={35} />,
    color: "#8B5CF6",
    description: "Renew TV subscriptions",
  },
  {
    title: "Internet",
    icon: <FaGlobe size={35} />,
    color: "#06B6D4",
    description: "Pay internet providers",
  },
  {
    title: "Betting",
    icon: <FaDice size={35} />,
    color: "#EF4444",
    description: "Fund betting wallets",
  },
];

export default function UtilityPayments() {
  const [selectedService, setSelectedService] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageLayout>
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 5px 20px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          Utility Payments
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "35px",
          }}
        >
          Pay bills securely from your Bloomvest wallet.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              onClick={() => {
                setSelectedService(service.title);
                setModalOpen(true);
              }}
              style={{
                background: service.color,
                color: "#fff",
                borderRadius: "18px",
                padding: "30px",
                cursor: "pointer",
                transition: ".3s",
                boxShadow: "0 10px 25px rgba(0,0,0,.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                {service.icon}
              </div>

              <h2
                style={{
                  marginBottom: "10px",
                }}
              >
                {service.title}
              </h2>

              <p
                style={{
                  opacity: 0.9,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <UtilityPaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </PageLayout>
  );
}