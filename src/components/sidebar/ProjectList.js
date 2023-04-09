import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetProjectsQuery } from '../../features/projects/projectApi';
import { selectedProjects } from '../../features/projects/projectSlice';
import Error from '../ui/Error';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);

  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedProjects(projectList));
  }, [dispatch, projectList]);

  const handleChecked = (e) => {
    let updatedList = [...projectList];

    if (!e.target.checked) {
      updatedList = [...projectList, e.target.value];
    } else {
      updatedList.splice(projectList.indexOf(e.target.value), 1);
    }
    setProjectList(updatedList);
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

  if (!isLoading && !isError && projects?.length === 0) {
    content = <Error message="No team project found" />;
  }
  if (!isLoading && !isError && projects?.length > 0) {
    content = projects?.map((item) => (
      <div className="checkbox-container" key={item.id}>
        <input
          checked={!projectList.includes(item.projectName)}
          type="checkbox"
          value={item.projectName}
          className={`${item.colorClass}`}
          onChange={handleChecked}
        />

        <p className="label">{item.projectName}</p>
      </div>
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
