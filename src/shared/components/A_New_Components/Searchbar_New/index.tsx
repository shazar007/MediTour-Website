import React from "react";
import style from "./style.module.css";
import classNames from "classnames";
import filterimg from "assets/images/filter.png";
import maginer from "assets/images/magnifyer.png";

interface SearchbarNewProps {
  placeholder?: any;
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  filter?: boolean;
  width?: any;
  value?: any;
}

const SearchbarNew: React.FC<SearchbarNewProps> = ({
  placeholder = "Search",
  onSearch,
  value,
  onFilterClick,
  filter = false,
  width = "100%",
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className={classNames(style.main)} style={{ width }}>
      <div className={style.searchContainer}>
        <img src={maginer} alt="maginer" className={style.searchIcon} />
        <input
          type="text"
          className={style.searchInput}
          placeholder={placeholder}
          onChange={handleSearchChange}
          value={value}
          style={{ width }}
        />
        {filter && (
          <button
            onClick={onFilterClick}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
            }}
          >
            <img
              src={filterimg}
              alt="filterimg"
              className={style.filterButton}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchbarNew;
