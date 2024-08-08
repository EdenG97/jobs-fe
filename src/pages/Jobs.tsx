import { formatDistanceToNow } from "date-fns";
import { FormEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import JobContainer from "../components/JobContainer";
import LoadingSpinner from "../components/LoadngSpinner";
import { IJob } from "../interfaces/Job";
import { useAuth } from "../stores/auth";

const LIMIT = 2;

export default function Home() {
  const auth = useAuth();
  const [limit, setLimit] = useState(LIMIT);
  const [moreJobs, setMoreJobs] = useState(true);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/jobs?limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const jobList = data.data;
          setMoreJobs(data.total !== jobList.length);
          setJobs(jobList);
        }
      } catch (error) {
        console.log("Error in Jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    getJobs();
  }, [limit]);

  async function onSearch(ev: FormEvent) {
    ev.preventDefault();

    const form = new FormData(ev.target as HTMLFormElement);
    const description = form.get("description") as string;
    const location = form.get("location") as string;
    const fulltime = form.get("fulltime") as string;

    const queryParams = new URLSearchParams();
    if (description) {
      queryParams.append("description", description);
    }

    if (location) {
      queryParams.append("location", location);
    }

    if (fulltime) {
      queryParams.append("fulltime", fulltime);
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/jobs?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const jobsList = data.data;
        setJobs(jobsList);
      }
    } catch (error) {
      console.log("Error in Jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  function getFormattedDate(date: string) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }

  function morePage() {
    setLimit(limit + LIMIT);
  }

  let content = (
    <div className="text-center py-4">
      <LoadingSpinner />;
    </div>
  );
  if (!loading) {
    if (jobs.length === 0) {
      content = (
        <div className="text-center py-4 text-2xl font-semibold">
          Jobs Not Found!
        </div>
      );
    } else {
      content = (
        <ul className="mt-2">
          {jobs.map((job) => (
            <li key={job.id} className="flex justify-between border-t-2 py-2">
              <div>
                <NavLink
                  to={`/detail/${job.id}`}
                  className="text-blue-700 font-bold text-xl">
                  {job.title}
                </NavLink>
                <p className="text-gray-500">
                  {job.company}:&nbsp;
                  <span className="text-green-800 font-bold">{job.type}</span>
                </p>
              </div>
              <div className="text-end text-gray-500 [&>*:first-child]:font-bold">
                <p>{job.location}</p>
                <p>{getFormattedDate(job.created_at)}</p>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <div>
      <form
        onSubmit={onSearch}
        className="flex justify-between items-center gap-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="description" className="font-bold">
            Job Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Filter by title, benefits, companires, expertise"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="location" className="font-bold">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Filter by city, state, zip code or country"
          />
        </div>
        <div className="flex gap-2">
          <input type="checkbox" name="fulltime" value="Y" />
          <label htmlFor="fulltime">Full Time Only</label>
        </div>
        <button type="submit" className="w-[100px]">
          Search
        </button>
      </form>
      <JobContainer>
        <h1 className="text-3xl font-bold">Job List</h1>
        {content}
      </JobContainer>
      {moreJobs && <button onClick={morePage}>More Jobs</button>}
    </div>
  );
}
