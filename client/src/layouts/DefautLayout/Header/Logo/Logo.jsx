import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../../../features/Client/ClientFilterSlice";

export default function Logo() {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    dispatch(resetFilter());
  };
  return (
    <div>
      <Link to="/" onClick={handleResetFilter} className="flex items-center">
        <img
          src="https://themewagon.com/wp-content/uploads/2021/03/Frame-172-1.png"
          className="h-9"
          alt="Computer logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"></span>
      </Link>
    </div>
  );
}
