import spinner from "@assets/spinner.svg";
import "./Spinner.css";

interface SpinnerProps {
  size?: string;
}

const Spinner = ({ size = "3rem" }: SpinnerProps) => {
  return (
    <img
      src={spinner}
      className="spinner"
      style={{ height: size }}
      alt="spinner"
    />
  );
};

export default Spinner;
