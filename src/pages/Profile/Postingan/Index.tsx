import { avatarName } from '@/utils/helpers/helper'
import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import ModalFormPostingan from './modalFormPostingan'
import CardPostList from '@/components/Cards/CardPostList'
import { usePosts } from '@/stores/posts/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDetailUser } from '@/stores/users/detail'

export default function ProfilPostinganIndex() {
    const params = useParams<{ id: string }>();
    const { id: idUser } = params;
    const { isOpen: isOpenPostForm, onOpen: onOpenFormPost, onClose: onCloseFormPost } = useDisclosure()
    const { getPosts, posts, loading } = usePosts()
    const { user } = useDetailUser();
    const [dataEditPost, setDataEditPost] = useState<TPostForm>();

    useEffect(() => {
        getPosts(idUser as unknown as number)
    }, [idUser]);

    return (
        <Box sx={{
            mx: -2,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box
                onClick={() => onOpenFormPost()}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    py: 4,
                    px: 2,
                    width: '100%',
                    borderBottomColor: 'gray.300',
                    borderBottomWidth: 1,
                    mt: 1
                }}>
                <Box>
                    <Image src={avatarName(user?.name)} sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }} />
                </Box>
                <Box>
                    <Box >
                        <Text sx={{
                            fontSize: 'md',
                            color: 'gray.600',
                        }}>
                            Apa yang anda pikirkan?
                        </Text>
                    </Box>
                </Box>
                <Box sx={{
                    ml: 'auto',
                }}>
                    <Button colorScheme='blue' size={'sm'} borderRadius={18} fontSize={'sm'} sx={{
                        bg: 'blue.300',
                    }}>
                        Posting
                    </Button>
                </Box>
            </Box>
            <CardPostList
                data={posts}
                isLoading={loading}
                user={user}
                onEdit={(data: TPosts) => {
                    setDataEditPost(data);
                    onOpenFormPost();
                }}
            />
            <ModalFormPostingan
                dataEdit={dataEditPost}
                setDataEdit={setDataEditPost}
                isOpenPostForm={isOpenPostForm}
                onCloseFormPost={onCloseFormPost} />
        </Box>
    )
}
