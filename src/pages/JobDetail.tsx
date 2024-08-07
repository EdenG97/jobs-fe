import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IJob } from "../interfaces/Job";
import { useAuth } from "../stores/auth";

export default function JobDetail() {
  const [jobDetail, setJobDetail] = useState<IJob | null>();
  const params = useParams();
  const auth = useAuth();

  const token = auth.token;
  const id = params["id"];

  useEffect(() => {
    let init = true;

    async function getJobDetail() {
      try {
        if (init) {
          const response = await fetch(`http://localhost:3001/job/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const jobDetail = data.data;
            console.log(jobDetail);
            setJobDetail(jobDetail);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    getJobDetail();

    return () => {
      init = false;
    };
  }, [id]);

  return (
    <div>
      <h1>Job Detail</h1>
      <div dangerouslySetInnerHTML={{ __html: jobDetail?.description! }}></div>
    </div>
  );
}
