import { avatarName } from '@/utils/helpers/helper'
import { Box, Button, FormControl, FormErrorMessage, Image, Modal, ModalBody, ModalContent, ModalOverlay, Text, Textarea, useToast } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDetailPost } from '@/stores/posts/detail'
import { useComments } from '@/stores/comments/store'
import { useDetailUser } from '@/stores/users/detail'

interface IModalFormKomentar {
    isOpenComentForm: boolean
    onCloseFormComment: () => void
    dataEdit?: TCommentForm
    setDataEdit?: React.Dispatch<React.SetStateAction<any>>
}

export default function ModalFormKomentar({
    isOpenComentForm,
    onCloseFormComment,
    dataEdit,
    setDataEdit
}: IModalFormKomentar) {
    const params = useParams<{ id: string, post_id: string }>();
    const { post_id } = params;
    const toast = useToast();
    const {addComment, editComment: editCommentStore} = useComments();
    const [loadingStorePost, setLoadingStorePost] = useState<boolean>(false);
    const {refreshDetailPost} = useDetailPost();
    const {user} = useDetailUser();

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<TCommentForm>();

    useEffect(() => {
        if (dataEdit?.id) {
            reset({
                body: dataEdit?.body,
            })
        }
    }, [dataEdit]);

    const onSubmit: SubmitHandler<TCommentForm> = async (data) => {
        setLoadingStorePost(true);
        try {
            const payload : TCommentForm = data;
            if(dataEdit?.id){
                editCommentStore(dataEdit?.id,{
                    body: payload.body,
                    name: user?.name,
                    email: user?.email,
                    postId: post_id as unknown as number,
                })
                refreshDetailPost();
            } else {
                addComment({
                    body: payload.body,
                    name: user?.name,
                    email: user?.email,
                    postId: (post_id as unknown as number)?? 0,
                })
            }

            toast({
                title: "Berhasil",
                description: "Komentar berhasil disimpan",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            reset({});
            onCloseFormComment();
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
        <Modal isOpen={isOpenComentForm} 
        onClose={() => {
            onCloseFormComment();
            setDataEdit?.({});
            reset({
                body: '',
            });
        }} size={'xl'}>
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
                        {dataEdit?.id ? 'Ubah Komentar' : 'Komentar Baru'}
                    </Text>
                    <Button onClick={onCloseFormComment} variant='none'
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
                                        src={avatarName(user?.name)} sx={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '50%'
                                        }} />
                                </Box>
                                <Box sx={{
                                    width: '100%',
                                }}>
                                    <FormControl isInvalid={errors?.body ? true : false}>
                                        <Textarea
                                            {...register('body', { required: 'Komentar harus diisi' })}
                                            placeholder="Mulai menulis komentar..."
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
