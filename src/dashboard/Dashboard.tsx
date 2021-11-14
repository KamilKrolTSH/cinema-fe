import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import { Showtime } from "../types/showtime";
import { Link } from "react-router-dom";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Film } from "../types/film";
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

export function Dashboard() {
  const [date, setDate] = useState<Date | null>(new Date());

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [filmId, setFilmId] = useState<number | undefined>(undefined);
  const [roomId, setRoomId] = useState<number | undefined>(undefined);

  const [confirmDisables, setConfirmDisabled] = useState<boolean>(true);

  const [films, setFilms] = useState<Film[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const validId = filmId !== undefined || roomId !== undefined;

    let validDate: boolean = false;

    if (date) {
      try {
        const tryDate = new Date(date);
        validDate = tryDate >= new Date();
      } catch (e) {
        validDate = false;
      }
    } else {
      validDate = false;
    }

    setConfirmDisabled(!validId || !validDate);
  }, [filmId, roomId, date]);

  useEffect(() => {
    loadShowtimes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadFilms();
      loadRooms();
      loadShowtimes();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadFilms = async () => {
    const res = await cinemaClient.getFilms();
    setFilms(res.content!);
  };

  const loadRooms = async () => {
    const res = await cinemaClient.getRooms();
    setRooms(res.content!);
  };

  const loadShowtimes = async () => {
    const res = await cinemaClient.getShowtimes();
    setShowtimes(res.content!);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setFilmId(undefined);
    setRoomId(undefined);
  };

  const handleConfirmation = async () => {
    await cinemaClient.addShowtime({
      FilmId: parseInt(filmId as any),
      RoomId: parseInt(roomId as any),
      Date: new Date(date as any),
    });
    setFilmId(undefined);
    setRoomId(undefined);
    handleModalClose();
  };

  const handleFilmIdChange = (e: any) => {
    setFilmId(e.target.value);
  };

  const handleRoomIdChangle = (e: any) => {
    setRoomId(e.target.value);
  };

  return (
    <div className="Dashboard">
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new showtime
          </Typography>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filmId}
            label="Film"
            onChange={handleFilmIdChange}
          >
            {films
              ? films.map((film) => {
                  return <MenuItem value={film.id}>{film.title}</MenuItem>;
                })
              : null}
          </Select>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roomId}
            label="Room"
            onChange={handleRoomIdChangle}
          >
            {rooms
              ? rooms.map((room) => {
                  return <MenuItem value={room.id}>{room.number}</MenuItem>;
                })
              : null}
          </Select>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props: any) => <TextField {...props} />}
              label="DateTimePicker"
              value={date}
              onChange={(newValue: any) => {
                setDate(newValue);
              }}
              minDateTime={new Date()}
            />
          </LocalizationProvider>

          <Typography
            className="Typog"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Button
              disabled={confirmDisables}
              onClick={handleConfirmation}
              variant="contained"
            >
              Confirm
            </Button>
            <Button onClick={handleModalClose} variant="outlined" color="error">
              Reject
            </Button>
          </Typography>
        </Box>
      </Modal>

      <Button onClick={handleModalOpen} variant="contained">
        Add showtime
      </Button>

      <Link className="link" to="/films">
        <Button variant="contained">Films</Button>
      </Link>
      <Link className="link" to="/rooms">
        <Button variant="contained">Rooms</Button>
      </Link>
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
