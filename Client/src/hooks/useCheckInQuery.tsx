import { useQuery } from '@tanstack/react-query';
import { checkAttendace } from '../api/user';

const useCheckInQuery = () => {
  return useQuery(['checkIn'], checkAttendace, {
    staleTime: Infinity,
    cacheTime: Infinity,
    meta: {
      errorMessage: 'Failed to get check in status',
    },
  });
};

export default useCheckInQuery;
