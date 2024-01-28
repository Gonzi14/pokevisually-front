import "./NextButton.css";

export const NextButton: React.FC<{
  icon: JSX.Element;
  handleClick: () => void;
}> = ({ icon, handleClick }) => {
  return (
    <button className="buttons" onClick={handleClick}>
      {icon}
    </button>
  );
};
