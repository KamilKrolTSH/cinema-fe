import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
  return (
    <div>
      <Link className="link" to="/login">
        <Button text="Login" />
      </Link>
      <Link className="link" to="/register">
        <Button text="Register" />
      </Link>
    </div>
  );
}
