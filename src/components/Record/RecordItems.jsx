import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import api from "../../api/api";
import useRecordStore from "../zustand/record/record.store";
import ReocrdItem from "./ReocrdItem";

function RecordItems() {
  const { month } = useRecordStore();
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
