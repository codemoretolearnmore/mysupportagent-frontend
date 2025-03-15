"use client";

import React from "react";
import { useTicketStore } from "../store";

const TestComponent = () => {
  const tickets = useTicketStore((state) => state.tickets);
  const setTickets = useTicketStore((state) => state.setTickets);

  return (
    <div>
      <button
        onClick={() => setTickets([{ id: 1, category: "Bug" }])}
      >
        Add Ticket
      </button>
      <p>Tickets: {JSON.stringify(tickets)}</p>
    </div>
  );
};

export default TestComponent;
