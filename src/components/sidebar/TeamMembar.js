import React from 'react';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Error from '../ui/Error';
import RotatingLine from '../ui/loaders/RotatingLine';

export default function TeamMembar() {
  const { data: team, isLoading, isError } = useGetTeamQuery();

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

  if (!isLoading && !isError && team?.length === 0) {
    content = <Error message="No team member found" />;
  }
  if (!isLoading && !isError && team?.length > 0) {
    content = team.map((item) => (
      <div className="checkbox-container" key={item.id}>
        <img src={item.avatar} className="team-avater" alt={item.name} />
        <p className="label">{item.name}</p>
      </div>
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
