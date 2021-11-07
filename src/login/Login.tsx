import { Button, TextField } from "@mui/material";
import "./Login.css";

export function Login() {
  return (
    <div className="Login">
      <TextField
        className="input"
        required
        id="outlined-basic"
        label="Name"
        variant="outlined"
      />
      <TextField
        className="input"
        required
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        className="input"
        required
        id="outlined-basic"
        label="Password"
        variant="outlined"
      />

      <Button>Submit</Button>
    </div>
  );
}
