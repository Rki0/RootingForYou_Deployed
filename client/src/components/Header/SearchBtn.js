import styles from "./SearchBtn.module.scss";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchBtn() {
  return (
    <div>
      <Link to="/search" className={styles.search}>
        <FaSearch />
      </Link>
    </div>
  );
}

export default SearchBtn;
