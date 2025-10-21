import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import { hitDeleteServerApi, hitServerApi } from "../../utils/hitServer";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

const universityColumns = [
  { key: "name", header: "University Name" },
  { key: "city", header: "City" },
  { key: "country", header: "Country" },
  { key: "programs", header: "Programs", render: (u:any) => u.programs?.length || 0 },
];

const University = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await hitServerApi(`/api/universities?page=${page}`);
      setData(response.universities || []);
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching universities:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Delete function
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this university?")) return;

    try {
      setLoading(true);
      await hitDeleteServerApi(`/api/universities/${id}`);
      // Refresh table after deletion
      fetchData(currentPage);
      alert("University deleted successfully!");
    } catch (err) {
      console.error("Error deleting university:", err);
      alert("Failed to delete university.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Update function placeholder
  const handleUpdate = (uni:string) => {
    // Navigate to edit page or open modal
    console.log("Update university:", uni);
    // Example: router.push(`/edit-university/${uni.id}`)
  };

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Universities" />
      <div className="space-y-6">
        <ComponentCard buttontitle="Add university" routelink="/add-university" title="All Universities">
          <BasicTableOne
          columns={universityColumns}
            data={data}
            loading={loading}
            onDelete={handleDelete}  // pass delete function
            onUpdate={handleUpdate}  // pass update function
            pagination={{
              page: currentPage,
              totalPages,
              onPageChange: (page) => setCurrentPage(page),
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default University;
