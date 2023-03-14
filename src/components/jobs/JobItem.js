import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeJobs } from '../../features/jobs/jobsSlice';
import CurrencyConvertion from '../../utils/currencyConvert';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function JobItem({ job }) {
  const { id, title, type, salary, deadline } = job;

  const { isLoading, isError } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeJobs(id));
  };

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/jobs/${id}`);
  };

  const typeChecking = (types) => {
    const string = types.replace(/\s+/g, '').toLowerCase();
    switch (string) {
      case 'fulltime':
        return 'text-[#FF8A00]';
      case 'remote':
        return 'text-[#56E5C4]';
      case 'internship':
        return 'text-[#FF5757]';

      default:
        return 'text-[#FF8A00]';
    }
  };

  return (
    <>
      {/* <!-- Single Job 1--> */}
      <div className="lws-single-job">
        <div className="flex-1 min-w-0">
          <h2 className="lws-title">{title}</h2>
          <div className="job-footers">
            <div className="lws-type">
              {/* <!-- Fulltime - #FF8A00,  --><!-- Internship - #FF5757,  --><!-- Remote - #56E5C4,  --> */}
              <i className={`fa-solid fa-stop !${typeChecking(type)} text-lg mr-1.5`} />
              {type}
            </div>
            <div className="lws-salary">
              <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5" />
              {CurrencyConvertion(salary)}
            </div>
            <div className="lws-deadline">
              <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5" />
              Closing on {deadline}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="hidden sm:block">
            <button type="button" className="lws-edit btn btn-primary" onClick={handleEdit}>
              <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2" />
              Edit
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              disabled={isLoading}
              type="button"
              className="lws-delete btn btn-danger "
              onClick={handleDelete}
            >
              {isLoading ? (
                <ThreeDot />
              ) : (
                <>
                  <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2" />
                  'Delete'
                </>
              )}
            </button>
          </span>
        </div>
        {!isLoading && isError && <p className="error">There was an error occured</p>}
      </div>
      {/* <!-- Single Job 1--> */}
    </>
  );
}
