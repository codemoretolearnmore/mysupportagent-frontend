import { useState, useEffect } from 'react';

export default function TicketTable({ tickets, handleUpdate}) {
  const [editedTickets, setEditedTickets] = useState({});

  // console.log(tickets)

  /**
   * Handles category change for a ticket.
   */

  useEffect(()=>{
    console.log(Object.keys(editedTickets).length)
  })
  const handleCategoryChange = (ticket, newCategory) => {
    const updatedTicket = { ...ticket, classification_category: newCategory };

    setEditedTickets((prev) => ({
      ...prev,
      [ticket._id]: updatedTicket,  // Key is _id, Value is updated ticket object
    }));
  };
  

  const saveCategoryChange =  async(ticketId)=>{
    const updatedCategory = editedTickets[ticketId].classification_category
    console.log(updatedCategory)
    if (!updatedCategory || updatedCategory === tickets.find(t => t._id === ticketId).classification_category) {
      alert("No changes to save.");
      return; // No change, do nothing
    }

    const updatedTicket = {
      id: ticketId,
      category: updatedCategory,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/save_edit`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTicket),
      });

      if (response.ok) {
          console.log(`Category updated successfully for Ticket ${ticketId}`);
          // Remove from editedTickets after successful update
          setEditedTickets(prev => {
              const newEditedTickets = { ...prev };
              delete newEditedTickets[ticketId];
              return newEditedTickets;
          });
          handleUpdate(editedTickets[ticketId])
      } else {
          console.error("Failed to update category.");
      }
    }catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="ticket-table-container">
      <h2>Classified Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Product</th>
            <th>Category</th>
            <th>Confidence Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.ticket_id}</td>
              <td className="ticket-description">{ticket.description}</td>
              <td>{ticket.product}</td>
              <td>
                <select defaultValue={ticket.classification_category}
                  
                  onChange={(e) => handleCategoryChange(ticket, e.target.value)}
                  className="category-dropdown"
                >
                  <option value="Billing">Billing</option>
                  <option value="Technical">Technical</option>
                  <option value="Challan Creation/Payment">Challan Creation/Payment</option>
                  <option value="FVU Generation">FVU Generation</option>
                  <option value="Certificate Generation">Certificate Generation</option>
                  <option value="Govt Validations">Govt Validations</option>
                  <option value="26AS">26AS</option>
                  <option value="26AS Recon">26AS Recon</option>
                  <option value="Others">Others</option>
                </select>
              </td>
              <td>{ticket.confidence_score}</td>
              <td>
                <button className={Object.keys(editedTickets).length == 0?"btn-disabled":"save-btn"} onClick={() => saveCategoryChange(ticket._id)} 
                disabled={Object.keys(editedTickets).length==0||Object.values(editedTickets).every(ticket => ticket.classification_category === tickets.find(t => t._id === ticket._id)?.classification_category)}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
