import Skeleton from '../Skeleton/Skeleton'
import CardPostItem from './CardPostItem'

interface ICardsPostList {
    data: TPosts[]
    isLoading?: boolean
    user: TUser
    onEdit?: (data: TPosts) => void
}

export default function CardPostList({
    data,
    user,
    isLoading,
    onEdit,
}: ICardsPostList) {
    return (
        data?.length > 0 || isLoading ?
            (isLoading ?
                <Skeleton count={10} height='100px' 
                sx={{
                    borderRadius: 'lg',
                }} />
                : data?.map((post: TPosts, index: number) => (
                    <CardPostItem key={index} user={user} data={post} onEdit={onEdit} />
                ))
            ) : (
                ''
            )
    )
}
