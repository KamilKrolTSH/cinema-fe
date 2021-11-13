import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import { Showtime } from "../types/showtime";
import { Link } from "react-router-dom";

const cinemaClient = new CinemaClient();

export function Dashboard() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);

  useEffect(() => {
    loadShowtimes();
  }, []);

  const loadShowtimes = async () => {
    const res = await cinemaClient.getShowtimes();
    setShowtimes(res.content!);
  };

  return (
    <div className="Dashboard">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Film</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Runtime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showtimes.map((showtime) => (
              <TableRow key={showtime.film.title}>
                <TableCell>
                  <Link className="link" to={`/showtime/${showtime.id}`}>
                    {showtime.film.title}
                  </Link>
                </TableCell>
                <TableCell>{showtime.date}</TableCell>
                <TableCell>{showtime.room.number}</TableCell>
                <TableCell>{showtime.film.runtime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
