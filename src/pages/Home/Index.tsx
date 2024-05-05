import CardUserList from '@/components/Cards/CardUserList';
import { FetchListUserQuery } from '@/services/usersQuery';
import { Box } from '@chakra-ui/react';

export default function HomeIndex() {
  const {
    data: dataListUsers,
    isLoading,
    isPending,
    isFetching,
  } = FetchListUserQuery({});

  console.log(dataListUsers)
  return (
    <Box sx={{
      mt: 4
    }}>
      <Box>
        <CardUserList data={dataListUsers} isLoading={isLoading || isPending || isFetching} />
      </Box>
    </Box>
  )
}
