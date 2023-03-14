/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateJobs } from '../../features/jobs/jobsSlice';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function EditForm({ editData }) {
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editsalary, setEditSalary] = useState('');

  const { isLoading, isError } = useSelector((state) => state.job);

  function formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }
  useEffect(() => {
    const { id, title, type, salary, deadline } = editData;
    if (id) {
      setEditTitle(title);
      setEditType(type);
      setEditDate(formatDate(deadline));
      setEditSalary(salary);
    }
  }, [editData]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetForm = () => {
    setEditTitle('');
    setEditType('');
    setEditDate('');
    setEditSalary('');
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    dispatch(
      updateJobs({
        id: editData?.id,
        data: { title: editTitle, type: editType, salary: editsalary, deadline: editDate },
      })
    );
    resetForm();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form className="space-y-6" onSubmit={handleUpdateJob}>
        <div className="fieldContainer">
          <label htmlFor="lws-JobTitle" className="text-sm font-medium text-slate-300">
            Job Title
          </label>
          <select
            id="lws-JobTitle"
            name="lwsJobTitle"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          >
            <option value="" hidden>
              Select Job
            </option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="MERN Stack Developer">MERN Stack Developer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Social Media Manager">Social Media Manager</option>
            <option value="Senior Executive">Senior Executive</option>
            <option value="Junior Executive">Junior Executive</option>
            <option value="Android App Developer">Android App Developer</option>
            <option value="IOS App Developer">IOS App Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobType">Job Type</label>
          <select
            id="lws-JobType"
            name="lwsJobType"
            required
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
          >
            <option value="" hidden>
              Select Job Type
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobSalary">Salary</label>
          <div className="flex border rounded-md shadow-sm border-slate-600">
            <span className="input-tag">BDT</span>
            <input
              type="number"
              name="lwsJobSalary"
              id="lws-JobSalary"
              required
              className="!rounded-l-none !border-0"
              placeholder="20,00,000"
              value={editsalary}
              onChange={(e) => setEditSalary(e.target.value)}
            />
          </div>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-JobDeadline">Deadline</label>
          <input
            type="date"
            name="lwsJobDeadline"
            id="lws-JobDeadline"
            required
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button
            disabled={isLoading}
            type="submit"
            id="lws-submit"
            className="cursor-pointer btn btn-primary w-fit"
          >
            {isLoading ? <ThreeDot /> : 'Edit'}
          </button>
        </div>
        {!isLoading && isError && <p className="error">There was an error occured</p>}
      </form>
    </div>
  );
}
