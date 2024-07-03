import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS_QUERY } from '../graphql/queries';

const Notification = () => {
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="notification-container">
      {data.notifications.length > 0 && (
        <div className="notification-bell">
          🔔 <span className="notification-count">{data.notifications.length}</span>
        </div>
      )}
    </div>
  );
};

export default Notification;
