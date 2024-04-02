import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";

const DynamicTable = ({
  headers,
  children,
  sortConfig,
  onSort,
}: {
  headers: TableHeader[];
  children: any;
  sortConfig: { orderby: string; order: "asc" | "desc" };
  onSort: React.Dispatch<
    React.SetStateAction<{ orderby: string; order: "asc" | "desc" }>
  >;
}) => {
  const requestSort = (key: string) => {
    if (sortConfig.orderby === key) {
      const order = sortConfig.order === "asc" ? "desc" : "asc";
      onSort((prevOrder) => ({
        ...prevOrder,
        order,
      }));
    } else {
      onSort(() => ({
        orderby: key,
        order: "asc",
      }));
    }
  };

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {headers.map((h, index) => (
            <th
              key={index}
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              <div className="flex">
                {h.label}

                {h.sortByKey ? (
                  <button
                    className="ml-2"
                    onClick={() => requestSort(h.sortByKey || "")}
                  >
                    {sortConfig.orderby === h.sortByKey ? (
                      sortConfig.order === "asc" ? (
                        <ArrowUpIcon className="h-4 text-primary" />
                      ) : (
                        <ArrowDownIcon className="h-4 text-primary" />
                      )
                    ) : (
                      <ArrowsUpDownIcon className="h-4" />
                    )}
                  </button>
                ) : null}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default DynamicTable;

interface TableHeader {
  label: string;
  sortByKey?: string;
}
