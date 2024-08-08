import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";
import { IJob } from "../interfaces/Job";

export default function JobsContent({ jobs }: { jobs: IJob[] }) {
  function getFormattedDate(date: string) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }

  return (
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
