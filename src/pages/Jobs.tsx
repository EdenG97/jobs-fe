import { useEffect, useState } from "react";
import { IJob } from "../interfaces/Job";
import { useAuth } from "../stores/auth";

export default function Home() {
  const auth = useAuth();
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    let init = false;
    async function getJobs() {
      try {
        if (!init) {
          const response = await fetch("http://localhost:3001/jobs", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const jobList = data.data;
            setJobs(jobList);
          }
        }
      } catch (error) {}
    }

    getJobs();

    return () => {
      init = true;
    };
  }, []);

  let jobList = <p className="font-bold">No Jobs Available</p>;
  if (jobs.length > 0) {
    jobList = (
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <p>Your job id: {job.id}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>List of jobs: </p>
      {jobList}
    </div>
  );
}
