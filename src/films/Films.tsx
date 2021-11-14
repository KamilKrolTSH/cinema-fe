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

export function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [runtime, setRuntime] = useState("1");

  const onTitleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(e.target.value);
  };

  const onRuntimeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      setRuntime(e.target.value);
    } else if (/^[1-9][0-9]?$|^[1-4][0-9][0-9]?$|^500$/.test(e.target.value)) {
      setRuntime(e.target.value);
    }
  };

  useEffect(() => {
    loadFilms();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadFilms();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadFilms = async () => {
    const res = await cinemaClient.getFilms();
    setFilms(res.content!);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setTitle("");
    setRuntime("1");
  };

  const handleConfirmation = async () => {
    await cinemaClient.createFilm({
      Title: title,
      Runtime: runtime.length > 0 ? parseInt(runtime) : 1,
    });
    handleModalClose();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="Films">
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new film
          </Typography>
          <Typography>
            <TextField
              onChange={onTitleChange}
              value={title}
              className="input"
              required
              id="outlined-basic"
              label="Title"
              variant="outlined"
              inputProps={{ maxLength: 50 }}
            />
          </Typography>
          <Typography>
            <TextField
              onChange={onRuntimeChange}
              value={runtime}
              className="input"
              required
              id="outlined-basic"
              label="Runtime"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 500 } }}
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
        Add new film
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Runtime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {films.map((film) => (
              <TableRow key={film.id}>
                <TableCell>{film.title}</TableCell>
                <TableCell>{film.runtime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
