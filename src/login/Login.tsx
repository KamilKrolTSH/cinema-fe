import { useHistory } from "react-router-dom";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CinemaClient } from "../clients/cinema.client";
import "./Login.css";

import {
  useAuthentication,
  useUpdateAuthentication,
} from "../providers/AuthenticateProvider";

const cinemaClinet = new CinemaClient();

const minLength = 4;
const maxLength = 10;

export function Login() {
  const history = useHistory();

  const authentication = useAuthentication();
  const updateAuthentication = useUpdateAuthentication();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const validInput = validateName(name) && validatePassword(password);

    setSubmitDisabled(!validInput);
  }, [name, password]);

  const validateName = (name: string) => name.length >= minLength;
  const validatePassword = (password: string) => password.length >= minLength;

  const onNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length < maxLength) setName(e.target.value);
  };

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value.length < maxLength) setPassword(e.target.value);
  };

  const onSubmitClick = async () => {
    const res = await cinemaClinet.login({
      Username: name,
      Password: password,
    });

    console.log("WOW RESPONSE");
    console.log(res);

    if (res.error === "INVALID_CREDENTIALS") {
      setSnackbarOpen(true);
    } else {
      updateAuthentication(res.content!.token);
      history.push("/dashboard");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="Login">
      <Typography variant="h4" component="h4">
        Login
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
          Invalid credentials
        </Alert>
      </Snackbar>
    </div>
  );
}
