import { avatarName } from '@/utils/helpers/helper'
import { Box, Button, FormControl, FormErrorMessage, Image, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, Textarea, useToast } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { storePost } from '@/services/api/endpoint/posts/store'
import { usePosts } from '@/stores/posts/store'
import { useState } from 'react'

interface IModalFormPostingan {
    isOpenPostForm: boolean
    onCloseFormPost: () => void
}

export default function ModalFormPostingan({
    isOpenPostForm,
    onCloseFormPost
}: IModalFormPostingan) {
    const params = useParams<{ id: string }>();
    const { id: idUser } = params;
    const toast = useToast();
    const {addPost} = usePosts();
    const [loadingStorePost, setLoadingStorePost] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<TPostForm>();

    const onSubmit: SubmitHandler<TPostForm> = async (data) => {
        setLoadingStorePost(true);
        try {
            const payload : TPostForm = {
                ...data,
                userId: idUser as unknown as number
            }
            const res = await storePost(payload);
            addPost({
                title: payload.title,
                body: payload.body,
                userId: payload.userId,
                id: res.id
            })
            toast({
                title: "Berhasil",
                description: "Postingan berhasil dibuat",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            reset();
            onCloseFormPost();
            clearErrors();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "Terjadi kesalahan, silahkan coba lagi",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
        }
        setLoadingStorePost(false);
    }


    return (
        <Modal isOpen={isOpenPostForm} onClose={onCloseFormPost} size={'xl'}>
            <ModalOverlay sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
            }} />
            <ModalContent top={"20%"} sx={{
                backgroundColor: 'transparent',
                shadow: 'none',
            }}>
                <Box sx={{
                    marginBottom: 2,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Text sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mx: 'auto',
                        fontSize: '22px',
                    }}>
                        Postingan Baru
                    </Text>
                    <Button onClick={onCloseFormPost} variant='none'
                        sx={{
                            color: 'black',
                            backgroundColor: 'transparent',
                            bg: 'white',
                            p: 0,
                            borderRadius: '50%',
                            height: '40px',
                            width: '40px',
                        }}>
                        <FaTimes />
                    </Button>
                </Box>
                <Box sx={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                }}>
                    <ModalBody>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'start',
                                gap: 4,
                                py: 4,
                            }}>
                                <Box>
                                    <Image
                                        src={avatarName('datan')} sx={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%'
                                        }} />
                                </Box>
                                <Box sx={{
                                    width: '100%',
                                }}>
                                    <FormControl mb={4} isInvalid={errors?.title ? true : false}>

                                        <Input
                                            {...register('title', { required: 'Judul postingan harus diisi' })}
                                            placeholder="Judul Postingan"
                                            sx={{
                                                width: '100%',
                                                border: 'none',
                                                w: '100%',
                                                bg: 'gray.100',
                                                borderRadius: 12,
                                            }} />
                                        {
                                            errors?.title && <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
                                        }
                                    </FormControl>
                                    <FormControl isInvalid={errors?.body ? true : false}>
                                        <Textarea
                                            {...register('body', { required: 'Isi postingan harus diisi' })}
                                            placeholder="Mulai menulis isi..."
                                            rows={6}
                                            sx={{
                                                width: '100%',
                                                border: 'none',
                                                w: '100%',
                                                bg: 'gray.100',
                                                borderRadius: 12,
                                            }} />
                                        {
                                            errors?.body && <FormErrorMessage>{errors?.body?.message}</FormErrorMessage>
                                        }
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box sx={{
                                float: 'right',
                                mb: 4
                            }}>
                                <Button
                                    isLoading={loadingStorePost}
                                    isDisabled={loadingStorePost || Object.keys(errors).length !== 0}
                                    type='submit'
                                    colorScheme='blue'
                                    size={'sm'}
                                    borderRadius={18}
                                    fontSize={'sm'}>
                                    Posting
                                </Button>
                            </Box>
                        </form>
                    </ModalBody>
                </Box>
            </ModalContent>
        </Modal>
    )
}
