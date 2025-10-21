import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Pagination from "../../Pagination";

// ✅ Generic props
export interface ColumnDef<T> {
  key: keyof T; // the property name in the data object
  header: string; // the column title
  render?: (item: T) => React.ReactNode; // optional custom renderer
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[]; // list of columns to render
  loading?: boolean;
  pagination: {
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
  };
  onDelete?: (id: number) => void;
  onUpdate?: (item: T) => void;
}

// ✅ Reusable Table Component
const BasicTableOne = <T extends { id: number }>({
  data,
  columns,
  loading = false,
  pagination,
  onDelete,
  onUpdate,
}: TableProps<T>) => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ===== Table Header ===== */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} isHeader>
                  {col.header}
                </TableCell>
              ))}
              {(onDelete || onUpdate) && <TableCell isHeader>Actions</TableCell>}
            </TableRow>
          </TableHeader>

          {/* ===== Table Body ===== */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading
              ? skeletonRows.map((_, idx) => (
                  <TableRow key={idx}>
                    {columns.map((_, cidx) => (
                      <TableCell key={cidx} className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                      </TableCell>
                    ))}
                    {(onDelete || onUpdate) && (
                      <TableCell className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : data.map((item) => (
                  <TableRow key={item.id}>
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="px-4 py-3">
                        {col.render
                          ? col.render(item)
                          : (item[col.key] as React.ReactNode)}
                      </TableCell>
                    ))}
                    {(onDelete || onUpdate) && (
                      <TableCell className="px-4 py-3 flex gap-2">
                        {onUpdate && (
                          <button
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={() => onUpdate(item)}
                          >
                            Update
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => onDelete(item.id)}
                          >
                            Delete
                          </button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* ===== Pagination ===== */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={pagination.onPageChange}
      />
    </div>
  );
};

export default BasicTableOne;
