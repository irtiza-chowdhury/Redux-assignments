import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../features/jobs/jobsSlice';
import RotatingLine from '../ui/loaders/RotatingLine';
import JobItem from './JobItem';
import JobSort from './JobSort';

export default function JobBody() {
  // const [input, setInput] = useState('');
  const { jobs, isLoading, isError } = useSelector((state) => state.job);
  const { salarySort, jobType, search } = useSelector((state) => state.sort);

  const salarySorted = [...jobs].sort((a, b) => {
    switch (salarySort) {
      case 'lowToHigh':
        return Number(a.salary) - Number(b.salary);
      case 'highToLow':
        return Number(b.salary) - Number(a.salary);

      default:
        return a;
    }
  });

  const filterByType = (job) => {
    switch (jobType) {
      case 'Internship':
        return job.type === 'Internship';
      case 'Full Time':
        return job.type === 'Full Time';
      case 'Remote':
        return job.type === 'Remote';

      default:
        return job;
    }
  };

  const filterBySearch = (job) => {
    if (search === '') {
      return job;
    }

    return job.title.toLowerCase().includes(search);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  let content = null;
  if (isLoading)
    content = (
      <div className="rotatingLine">
        <RotatingLine />
        <RotatingLine />
        <RotatingLine />
        <RotatingLine />
      </div>
    );

  if (!isLoading && isError) content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && jobs?.length > 0) {
    content = salarySorted
      .filter(filterByType)
      .filter(filterBySearch)
      .map((job) => <JobItem key={job.id} job={job} />);
  }

  if (!isLoading && !isError && jobs?.length === 0) {
    content = <p className="error">No jobs found!</p>;
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
          <h1 className="lws-section-title">All {jobType} Jobs</h1>
          <JobSort />
        </div>

        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
}
