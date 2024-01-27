import "./NextButton.css";

export const NextButton = ({ icon, handleClick }) => {
  return (
    <button className="buttons" onClick={handleClick}>
      {" "}
      {icon}
    </button>
  );
};
