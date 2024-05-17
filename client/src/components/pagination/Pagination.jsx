import React, { useContext } from "react";
import { Context } from "../../App";

const Pagination = ({ countOfEvents }) => {
  const perPage = 4;
  const arrPage = Array.from(
    { length: countOfEvents / perPage },
    (_, i) => i + 1
  );

  const [activePage, setActivePage] = useContext(Context);

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setActivePage(activePage - 1)}
        disabled={activePage === 1}
      >
        {"<-"}
      </button>
      <div className="flex gap-2">
        {arrPage.map((page) => (
          <button
            key={page}
            className={activePage === page ? "text-sm" : "text-base"}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => setActivePage(activePage + 1)}
        disabled={activePage === arrPage.length}
      >
        {"->"}
      </button>
    </div>
  );
};

export default Pagination;
