import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import api from "../../api/api";
import ReocrdItem from "./ReocrdItem";

function RecordItems() {
  const month = useSelector((state) => state.record.month);
  const prevRecord = useLoaderData();
  const { data: records } = useQuery({
    queryKey: ["records"],
    queryFn: () => api.record.getRecord(),
    initialData: prevRecord,
  });

  const paintRecords = () => {
    return records?.map((item) => {
      const itemMonth = Number(item.date.slice(5, 7));
      if (itemMonth === month) {
        return <ReocrdItem key={item.id} record={item} />;
      }
    });
  };
  return <>{paintRecords()}</>;
}

export default RecordItems;
