import { Link } from "react-router-dom";
import "./Home.css";
import Button from "@mui/material/Button";

export function Home() {
  return (
    <div>
      <Link className="link" to="/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link className="link" to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </div>
  );
}
