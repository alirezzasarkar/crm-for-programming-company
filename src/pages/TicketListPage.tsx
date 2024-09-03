import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../components/Ticket/TicketList";
import { getTickets, deleteTicket } from "../services/ticket";

interface Ticket {
  id: number;
  title: string;
  status: string;
  dateSent: string;
}

const TicketListPage: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // دریافت لیست تیکت‌ها از API
  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDetailsClick = (ticket: Ticket) => {
    navigate(`/dashboard/tickets/detail/${ticket.id}`);
  };

  const handleNewClick = () => {
    navigate("/dashboard/tickets/new");
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteTicket(id);
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };

  return (
    <>
      <TicketList
        tickets={tickets}
        onDetailsClick={handleDetailsClick}
        onNewClick={handleNewClick}
        onDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default TicketListPage;
