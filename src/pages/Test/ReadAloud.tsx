import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { hitDeleteServerApi, hitServerApi } from "../../utils/hitServer";

const readAloudColumns = [
  { key: "passage", header: "Passage" },
  { key: "difficulty", header: "Difficulty" },
  { key: "category", header: "Category" },
  { key: "createdAt", header: "Created At", render: (q:any) => new Date(q.createdAt).toLocaleDateString() },
];


const ReadAloud = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await hitServerApi(`/api/readaloud?page=${page}`);
      setData(response.questions || []); // adjust based on your backend response shape
      setCurrentPage(response.pagination?.page || 1);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching read aloud questions:", err);
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
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      setLoading(true);
      await hitDeleteServerApi(`/api/readaloud/${id}`);
      fetchData(currentPage);
      alert("Question deleted successfully!");
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question.");
    } finally {
      setLoading(false);
    }
  };

  // Optional update function placeholder
  const handleUpdate = (question: any) => {
    console.log("Update read aloud question:", question);
    // e.g., router.push(`/edit-readaloud/${question.id}`)
  };

  return (
    <>
      <PageMeta
        title="PTE Read Aloud | Admin Dashboard"
        description="Manage PTE Read Aloud questions"
      />
      <PageBreadcrumb pageTitle="PTE Read Aloud" />
      <div className="space-y-6">
        <ComponentCard buttontitle="Add Question" routelink="/add-readaloud" title="All Read Aloud Questions">
          <BasicTableOne
  data={data}
  columns={readAloudColumns}
  loading={loading}
  onDelete={handleDelete}
  onUpdate={handleUpdate}
  pagination={{
    page: currentPage,
    totalPages,
    onPageChange: (page) => setCurrentPage(page),
  }}
/>;
        </ComponentCard>
      </div>
    </>
  );
};

export default ReadAloud;
