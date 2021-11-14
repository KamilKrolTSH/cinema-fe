import { useHistory } from "react-router-dom";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import "./RegisterAdmin.css";

const cinemaClinet = new CinemaClient();

const minLength = 4;
const maxLength = 10;

export function RegisterAdmin() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const validInput =
      validateName(name) && validateEmail(email) && validatePassword(password);

    setSubmitDisabled(!validInput);
  }, [name, email, password]);

  const validateName = (name: string) => name.length >= minLength;
  const validateEmail = (email: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const validatePassword = (password: string) => password.length >= minLength;

  const onNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length < maxLength) setName(e.target.value);
  };

  const onEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length < maxLength) setEmail(e.target.value);
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length < maxLength) setPassword(e.target.value);
  };

  const onSubmitClick = async () => {
    const res = await cinemaClinet.registerAdmin({
      Username: name,
      Email: email,
      Password: password,
    });

    if (res.error === "USER_EXISTS") {
      setSnackbarOpen(true);
    } else {
      history.push("/login");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="Register">
      <Typography variant="h4" component="h4">
        Register Admin
      </Typography>
      <TextField
        className="input"
        required
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={onNameChange}
        helperText={`Minimum characters is ${minLength}`}
      />
      <TextField
        className="input"
        required
        id="outlined-basic"
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={onEmailChange}
      />
      <TextField
        className="input"
        required
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={onPasswordChange}
        helperText={`Minimum characters is ${minLength}`}
      />
      <Button
        variant="contained"
        onClick={onSubmitClick}
        disabled={submitDisabled}
      >
        Submit
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          User already exists
        </Alert>
      </Snackbar>
    </div>
  );
}
