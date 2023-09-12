import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Reserve = ({ setOpen, hotelId }) => {
  return (
    <div className="reserver">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="cursor-pointer"
        onClick={() => setOpen(false)}
      />
    </div>
  );
};

export default Reserve;
