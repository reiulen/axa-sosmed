import { Grid } from '@chakra-ui/react'
import Skeleton from '../Skeleton/Skeleton'
import CardAlbumItem from './CardAlbumItem'

interface ICardsUserList {
    data: TAlbums[]
    isLoading?: boolean
}

export default function CardAlbumList({
    data,
    isLoading
}: ICardsUserList) {
    return (
        data?.length > 0 || isLoading ?
            (
                <Grid
                    templateColumns='repeat(2, 1fr)'
                    mt={4}
                    gap={{
                        base: 2,
                        md: 5
                    }}>
                    {
                        isLoading ?
                            <Skeleton count={10} height='180px' sx={{
                                borderRadius: 'lg',
                            }} />
                            : data?.map((album: TAlbums, index: number) => (
                                <CardAlbumItem key={index} album={album} />
                            ))
                    }
                </Grid>
            ) : (
                ''
            )
    )
}
