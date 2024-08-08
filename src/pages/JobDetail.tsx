import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import JobContainer from "../components/JobContainer";
import LoadingSpinner from "../components/LoadngSpinner";
import { IJob } from "../interfaces/Job";
import { useAuth } from "../stores/auth";

export default function JobDetail() {
  const [jobDetail, setJobDetail] = useState<IJob>({
    id: "",
    company: "",
    company_logo: "",
    company_url: "",
    created_at: "",
    description: "",
    how_to_apply: "",
    location: "",
    title: "",
    type: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const auth = useAuth();

  const token = auth.token;
  const id = params["id"];

  useEffect(() => {
    let init = true;

    async function getJobDetail() {
      try {
        setLoading(true);
        if (init) {
          const response = await fetch(`http://localhost:3001/job/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const jobDetail = data.data;
            setJobDetail(jobDetail);
          }
        }
      } catch (error) {
        console.log("Error in Job Detail:", error);
      } finally {
        setLoading(false);
      }
    }

    getJobDetail();

    return () => {
      init = false;
    };
  }, [id]);

  let content = (
    <div className="text-center py-4">
      <LoadingSpinner />;
    </div>
  );
  if (!loading) {
    content = (
      <>
        <p className="text-gray-500 [&>*:first-child]:font-bold">
          {jobDetail.type} / {jobDetail.location}
        </p>
        <h1 className="text-3xl font-bold">{jobDetail.title}</h1>
        <span className="block w-full my-4 border"></span>
        <div className="flex gap-8">
          <div
            dangerouslySetInnerHTML={{ __html: jobDetail.description }}></div>
          <img
            src="/company.jpg"
            alt="company"
            className="h-[400px] w-[500px]"
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <NavLink to="/" className="text-blue-700 font-bold text-xl">
        Back
      </NavLink>
      <JobContainer>{content}</JobContainer>
    </div>
  );
}
