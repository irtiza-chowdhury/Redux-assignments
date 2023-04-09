/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { projectApi } from '../../features/projects/projectApi';
import {
  useAddNewTaskMutation,
  // eslint-disable-next-line prettier/prettier
  useEditTaskMutation
} from '../../features/tasks/tasksApi';

import { teamApi } from '../../features/team/teamApi';
import ThreeDot from '../ui/loaders/ThreeDot';

export default function Form({ taskId, editData }) {
  const [projects, setProjects] = useState();
  const [teams, setTeams] = useState();

  const [taskName, setTaskName] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [date, setDate] = useState('');

  const [addNewTask, { isLoading }] = useAddNewTaskMutation();

  const [editTask, { isLoading: editLoading }] = useEditTaskMutation();

  const { taskName: editTaskName, teamMember, project, deadline } = editData || {};

  const teamInfo = teams?.find((elem) => elem.name === assignTo);

  const projectInfo = projects?.find((elem) => elem.projectName === projectName);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      setTaskName(editTaskName);
      setAssignTo(teamMember?.name);
      setProjectName(project?.projectName);
      setDate(deadline);
    }
  }, [deadline, editTaskName, project, taskId, teamMember]);

  const handleAddTask = (e) => {
    e.preventDefault();
    addNewTask({
      taskName,
      teamMember: {
        name: assignTo,
        avatar: teamInfo.avatar,
        id: teamInfo.id,
      },
      project: {
        id: projectInfo?.id,
        projectName,
        colorClass: projectInfo?.colorClass,
      },
      deadline: date,
      status: 'pending',
    });

    navigate('/');
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();

    editTask({
      id: taskId,
      data: {
        taskName,
        teamMember: {
          name: assignTo,
          avatar: teamInfo.avatar,
          id: teamInfo.id,
        },
        project: {
          id: projectInfo?.id,
          projectName,
          colorClass: projectInfo?.colorClass,
        },
        deadline: date,
      },
    });

    navigate('/');
  };

  useEffect(() => {
    dispatch(projectApi.endpoints.getProjects.initiate())
      .unwrap()
      .then((data) => setProjects(data));

    dispatch(teamApi.endpoints.getTeam.initiate())
      .unwrap()
      .then((data) => setTeams(data));
  }, [dispatch, teams]);

  return (
    <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
      <form
        className="space-y-6"
        onSubmit={(e) => (taskId ? handleUpdateTask(e) : handleAddTask(e))}
      >
        <div className="fieldContainer">
          <label htmlFor="lws-taskName">Task Name</label>
          <input
            type="text"
            name="taskName"
            id="lws-taskName"
            required
            placeholder="Implement RTK Query"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="fieldContainer">
          <label>Assign To</label>
          <select
            name="teamMember"
            id="lws-teamMember"
            required
            value={assignTo}
            onChange={(e) => {
              setAssignTo(e.target.value);
            }}
          >
            <option value="" hidden>
              Select Job
            </option>
            {teams?.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-projectName">Project Name</label>
          <select
            id="lws-projectName"
            name="projectName"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          >
            <option value="" hidden>
              Select Project
            </option>
            {projects?.map((item) => (
              <option key={item.id} value={item.projectName}>
                {item.projectName}
              </option>
            ))}
          </select>
        </div>

        <div className="fieldContainer">
          <label htmlFor="lws-deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            id="lws-deadline"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="lws-submit " disabled={isLoading || editLoading}>
            {isLoading || editLoading ? <ThreeDot /> : taskId ? 'Edit' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
