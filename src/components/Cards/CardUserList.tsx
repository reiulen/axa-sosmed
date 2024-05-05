import { Grid } from '@chakra-ui/react'
import CardUserItem from './CardUserItem'
import Skeleton from '../Skeleton/Skeleton'

interface ICardsUserList {
    data: TUser[]
    isLoading?: boolean
}

export default function CardUserList({
    data,
    isLoading
}: ICardsUserList) {
    return (
        data?.length > 0 || isLoading ?
            (
                <Grid templateColumns='repeat(2, 1fr)' gap={{
                    base: 2,
                    md: 4
                }}>
                    {
                        isLoading ?
                            <Skeleton count={10} height='180px' sx={{
                                borderRadius: 'lg',
                            }} />
                            : data?.map((user: TUser, index: number) => (
                                <CardUserItem key={index} user={user} />
                            ))
                    }
                </Grid>
            ) : (
                ''
            )
    )
}
