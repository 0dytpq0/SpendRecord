import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import useFormStore from "../zustand/record/form.store";
import Reocrd from "./Reocrd";

function Records() {
  const { month } = useFormStore();
  const prevRecord = useLoaderData();
  const { data: records } = useQuery({
    queryKey: ["records"],
    queryFn: () => api.record.getRecord(),
    initialData: prevRecord,
  });

  return (
    <Container>
      {records?.map((record) => {
        const itemMonth = Number(record.date.slice(5, 7));
        if (itemMonth === month) {
          return <Reocrd key={record.id} record={record} />;
        }
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default Records;
