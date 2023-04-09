import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import SideBar from '../sidebar/SideBar';
import Task from '../task/Task';
import Error from '../ui/Error';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function Home() {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();

  const { selectedProjects, search } = useSelector((state) => state.project);

  const filteredTask = tasks?.filter(
    (task) => !selectedProjects.includes(task?.project?.projectName)
  );

  const handleSearchTask = (task) => {
    if (search === '') {
      return task;
    }
    if (search !== '') {
      return task?.taskName.toLowerCase().includes(search);
    }
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="loading-class">
        <RotatingLine />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && tasks?.length === 0) {
    content = <Error message="No tasks found" />;
  }
  if (!isLoading && !isError && tasks?.length > 0) {
    content = filteredTask
      ?.filter(handleSearchTask)
      .map((task) => <Task task={task} key={task.id} />);
  }
  return (
    <div className="container relative">
      <SideBar />
      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
            <Link to="/addtask" className="lws-addnew group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-indigo-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              <span className="group-hover:text-indigo-500">Add New</span>
            </Link>
          </div>

          <div className="lws-task-list">{content}</div>
        </main>
      </div>
    </div>
  );
}
