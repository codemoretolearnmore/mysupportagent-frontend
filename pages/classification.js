import TicketTable from "../components/TicketTable";
import SearchFilter from "../components/SearchFilter";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTicketStore } from "../store";

/**
 * Classification Page
 * Displays classified tickets with search and edit functionality.
 */
export default function ClassificationPage() {
  const router = useRouter();
  // const tickets = useTicketStore((state) => state.tickets);
  const job_id = useTicketStore((state) => state.jobId)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleUpdate = (updatedTicket)=>{
    setTickets(()=>tickets.map(ticket=>ticket._id ==updatedTicket._id?{...ticket,...updatedTicket}:ticket))
  }

  useEffect(() => {
    if (!job_id) return; // 🚨 Prevent execution if job_id is null

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BASE_URL}/${job_id}`);

    ws.onopen = () => {
      console.log("WebSocket Connected for job:", job_id);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket data:", data);

      if (data.message === "Classification Completed") {
        setTickets(data.classified_tickets);
        setLoading(false);
        router.push("/classification"); // Redirect to classification page
      }
      else if(data.message ==="No Classification Job Found"){
        setTickets([])
        setLoading(false)
        router.push("/classification");
      }
      else if(data.message ==="Classification FAILED"){
        setTickets([])
        setLoading(false)
        router.push("/classification");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close(); // Cleanup WebSocket on unmount
    };
  }, [job_id]);

  useEffect(() => {
    let filtered = tickets
    if(searchTerm.trim()=='')
      filtered = filtered
    if(searchTerm.trim()!==''){
      filtered = filtered.filter(ticket =>
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }
    if (selectedCategory && selectedCategory!="") {
      filtered = filtered.filter(ticket => ticket.classification_category === selectedCategory);
    }


    setFilteredTickets(filtered);
  }, [searchTerm, selectedCategory, tickets]);

  const handleSearch = (searchTerm)=>{
    searchTerm = searchTerm.trim()
    setSearchTerm(searchTerm)
  }

  const handleFilterChange = (selectedCategory)=>{
    // filteredTickets = 
    setSelectedCategory(selectedCategory)
  }

  


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      {/* Search & Filter Section */}
      <div style={{ width: "90%", display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <SearchFilter onSearch={handleSearch} onFilterChange={handleFilterChange} />
      </div>
      {loading?<Loader/>:<div style={{ width: "90%" }}>
        <TicketTable tickets={filteredTickets} handleUpdate ={handleUpdate}/>
      </div>}
      {/* Table Section */}
      
    </div>
  );
}
