import { Pagination } from "../middleware/Interfaces";

export default function PaginatedNav(props: Pagination) {
  const handlePageChange = (newPage: number) => {
    props.setCurrentPage(newPage);
  };

  return (
    <div key="buttons" className="flex buttons">
      {Math.ceil(props.length / props.rowsPerPage) < props.currentPage + 1
        ? Array.from(
            { length: Math.ceil(props.length / props.rowsPerPage) },
            (_, i) => (
              <button
                key={`button-${i}`}
                className={`button2 ${
                  props.currentPage === i + 1 ? "selectedPage" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ),
          )
        : Array.from(
            { length: Math.ceil(props.length / props.rowsPerPage) },
            (_, i) => {
              if (i < props.currentPage - 2 && i !== 0) {
                return <h1 key={`${i}-dots`}>...</h1>;
              } else if (
                (!(i > props.currentPage + 1) && i < props.currentPage + 1) ||
                i + 1 === Math.ceil(props.length / props.rowsPerPage)
              ) {
                return (
                  <button
                    key={`button-${i}`}
                    className={`button2 ${
                      props.currentPage === i + 1 ? "selectedPage" : ""
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              } else {
                return <h1 key={`${i}-dots`}>...</h1>;
              }
            },
          )}
    </div>
  );
}
