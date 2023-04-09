import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEditedTaskQuery } from '../../features/tasks/tasksApi';
import Form from '../forms/Form';

export default function EditTask() {
  const { taskId } = useParams();
  const { data: editData } = useGetEditedTaskQuery(taskId);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <Form taskId={taskId} editData={editData} />
      </main>
    </div>
  );
}
