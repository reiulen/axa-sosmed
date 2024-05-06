import { Flex } from '@chakra-ui/react'
import Skeleton from '../Skeleton/Skeleton'
import CardCommentItem from './CardCommentItem'

interface ICardsCommentList {
    data: TComment[]
    isLoading?: boolean
    user: TUser
    onEdit?: (data: TComment) => void
}

export default function CardCommentList({
    data,
    user,
    isLoading,
    onEdit,
}: ICardsCommentList) {
    return (
        data?.length > 0 || isLoading ?
            (isLoading ?
                <Flex 
                sx={{
                    flexDirection: 'column',
                    gap: 2,
                    mt: 4,
                }}>
                    <Skeleton count={10} height='100px'
                        sx={{
                            borderRadius: 'lg',
                        }} />
                </Flex>
                : data?.map((post: TComment, index: number) => (
                    <CardCommentItem key={index} user={user} data={post} onEdit={onEdit} />
                ))
            ) : (
                ''
            )
    )
}
