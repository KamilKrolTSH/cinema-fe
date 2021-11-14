import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import { Film } from "../types/film";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { Room } from "../types/room";

const cinemaClient = new CinemaClient();

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [number, setNumber] = useState("1");
  const [seats, setSeats] = useState("1");

  const onNumberChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      setNumber(e.target.value);
    } else if (/^[1-9][0-9]?$|^[1-9][0-9][0-9]?$|^1000$/.test(e.target.value)) {
      setNumber(e.target.value);
    }
  };

  const onSeatsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      setSeats(e.target.value);
    } else if (/^[1-4][0-9]?$|^50$/.test(e.target.value)) {
      setSeats(e.target.value);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadRooms();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadRooms = async () => {
    const res = await cinemaClient.getRooms();
    setRooms(res.content!);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNumber("1");
    setSeats("1");
  };

  const handleConfirmation = async () => {
    await cinemaClient.createRoom({
      Number: number.length > 0 ? parseInt(number) : 1,
      Seats: seats.length > 0 ? parseInt(seats) : 1,
    });
    handleModalClose();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="Rooms">
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new room
          </Typography>
          <Typography>
            <TextField
              onChange={onNumberChange}
              value={number}
              className="input"
              required
              id="outlined-basic"
              label="Number"
              variant="outlined"
            />
          </Typography>
          <Typography>
            <TextField
              onChange={onSeatsChange}
              value={seats}
              className="input"
              required
              id="outlined-basic"
              label="Sets"
              variant="outlined"
              type="number"
            />
          </Typography>
          <Typography
            className="Typog"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Button onClick={handleConfirmation} variant="contained">
              Confirm
            </Button>
            <Button onClick={handleModalClose} variant="outlined" color="error">
              Reject
            </Button>
          </Typography>
        </Box>
      </Modal>

      <Button onClick={handleModalOpen} variant="contained">
        Add new room
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Seats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.seats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
