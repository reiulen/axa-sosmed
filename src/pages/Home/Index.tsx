import CardUserList from '@/components/Cards/CardUserList';
import { useUsers } from '@/stores/users/store';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function HomeIndex() {
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
