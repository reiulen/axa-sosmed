import CardUserList from '@/components/Cards/CardUserList';
import { FetchListUserQuery } from '@/services/usersQuery';
import { useUsers } from '@/stores/users/store';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function HomeIndex() {
  // const {
  //   data: dataListUsers,
  //   isLoading,
  //   isPending,
  //   isFetching,
  // } = FetchListUserQuery({});
  const {users, getUsers, loading} = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{
      mt: 4
    }}>
      <Box>
        <CardUserList data={users} isLoading={loading} />
      </Box>
    </Box>
  )
}
