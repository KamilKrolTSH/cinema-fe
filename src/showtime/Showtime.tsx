import { useParams } from "react-router-dom";
import { Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import { Showtime as ShowtimeType } from "../types/showtime";
import { Booking } from "../types/booking";
import "./Showtime.css";
import { Box } from "@mui/system";

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

const cinemaClient = new CinemaClient();

interface Seet {
  id: number;
  available: boolean;
}

const prepareData = (seetsAmout: number, bookings: Booking[]) => {
  const seets: Seet[] = [];

  for (let i = 1; i <= seetsAmout; i++) {
    const foundBooking = bookings.find((booking) => booking.seat === i);

    const occupied = foundBooking
      ? foundBooking.confirmed ||
        new Date(foundBooking.dateToConfirm) > new Date()
      : false;

    seets.push({
      id: i,
      available: !occupied,
    });
  }

  return seets;
};

export function Showtime() {
  const params = useParams<{ id: string }>();

  const [showtime, setShowtime] = useState<undefined | ShowtimeType>(undefined);
  const [seat, setSeat] = useState<undefined | number>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    loadShowtimes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadShowtimes();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      handleModalClose();
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [counter]);

  const loadShowtimes = async () => {
    const res = await cinemaClient.getShowtime(params.id);
    await setShowtime(res.content!);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCounter(0);
  };

  const handleSeetClick = async (e: any, id: number) => {
    setSeat(id);
    setCounter(60);
    await cinemaClient.lockASeat({ seat: id, showtimeId: showtime?.id! });
    loadShowtimes();

    setModalOpen(true);
  };

  const handleConfirmation = async () => {
    await cinemaClient.confirmLock({ seat: seat!, showtimeId: showtime?.id! });
    setModalOpen(false);
  };

  const handleRejection = () => {
    setCounter(0);
    setModalOpen(false);
  };

  function Picker({ id, available }: Seet) {
    return (
      <div className="Picker">
        <Button
          onClick={(e) => handleSeetClick(e, id)}
          disabled={!available}
          className="Seet"
          variant="contained"
        >
          {id}
        </Button>
      </div>
    );
  }

  return (
    <div className="Showtime">
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm your booking. You have {counter} seconds left.
          </Typography>
          <Typography
            className="Typog"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Button onClick={handleConfirmation} variant="contained">
              Confirm
            </Button>
            <Button onClick={handleRejection} variant="outlined" color="error">
              Reject
            </Button>
          </Typography>
        </Box>
      </Modal>

      {showtime
        ? prepareData(showtime.room.seets!, showtime?.bookings!).map((data) => {
            return <Picker id={data.id} available={data.available} />;
          })
        : null}
    </div>
  );
}
