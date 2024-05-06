import React from 'react'
import { Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useDisclosure } from '@chakra-ui/react'
import { avatarName } from '@/utils/helpers/helper'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { FaPencilAlt, FaRegComment, FaTrashAlt } from 'react-icons/fa'
import { useAlertDialogStore } from '@/stores/alert/alertDialogStore'
import { usePosts } from '@/stores/posts/store'
import { Link } from 'react-router-dom'
import ModalFormKomentar from '@/pages/Profile/Postingan/Detail/modalFormKomentar'

interface CardPostItemProps {
    data: TPosts
    user: TUser
    onEdit?: (data: TPosts) => void
    commentCount?: number
}

export default function CardPostItem({
    data,
    user,
    onEdit,
    commentCount
}: CardPostItemProps) {
    const { setAlertDialog, resetAlertDialog } = useAlertDialogStore();
    const { deletePost } = usePosts();
    const { isOpen: isOpenFormComment, onOpen: onOpenFormComment, onClose: onCloseFormComment } = useDisclosure()


    const handleDeletePost = () => {
        setAlertDialog({
            isOpen: true,
            title: 'Hapus Postingan',
            message: `Apakah yakin ingin menghapus postingan ini? ?`,
            textConfirm: 'Hapus',
            textCancel: 'Batal',
            onConfirm: () => {
                deletePost(data?.id as number)
                resetAlertDialog()
            },
            onCancel: () => {
                resetAlertDialog()
            }
        })
    }
    return (
        <Box
            as={Link}
            to={`/${data?.userId}/post/${data?.id}`}
            sx={{
                borderBottomColor: 'rgb(239, 243, 244)',
                borderBottomWidth: 1,
                _hover: {
                    background: 'gray.50',
                }
            }}>
            <Flex
                sx={{
                    gap: 4,
                    py: 4,
                    px: 2,
                }}>
                <Box sx={{
                    width: '6%',
                }}>
                    <Image src={avatarName(user?.name)} sx={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%'
                    }} />
                </Box>
                <Box sx={{
                    width: '94%',
                }}>
                    <Flex sx={{
                        gap: 2
                    }}>
                        <Text sx={{
                            fontSize: 'sm',
                            fontWeight: 'semibold',
                        }}>
                            {user?.name}
                        </Text>
                        <Text sx={{
                            fontSize: 'sm',
                            color: 'gray.800',
                        }}>
                            @{user?.username}
                        </Text>
                    </Flex>
                    <Box mt={2}>
                        <Text sx={{
                            fontSize: 'md',
                            color: 'gray.800',
                            fontWeight: 'semibold'
                        }}>
                            {data?.title}
                        </Text>
                        <Text sx={{
                            fontSize: 'sm',
                            color: 'gray.700',
                        }}>
                            {data?.body}
                        </Text>
                    </Box>
                    <Flex sx={{ 
                        gap: 4,
                        mt: 3
                     }}>
                        <Box
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                onOpenFormComment();
                            }}>
                            <Text sx={{
                                fontSize: 'sm',
                                color: 'gray.600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Icon as={FaRegComment} />
                                Komentari
                            </Text>
                        </Box>
                        {
                            commentCount && (
                                <Box
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        onOpenFormComment();
                                    }}>
                                    <Text sx={{
                                        fontSize: 'sm',
                                        color: 'gray.600',
                                    }}>
                                        {commentCount} Komentar
                                    </Text>
                                </Box>
                            )
                        }
                    </Flex>
                </Box>
                <Box
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}>
                    <Menu>
                        <MenuButton
                            as={Box}
                            role='button'
                            sx={{
                                height: '25px',
                                width: '25px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                borderRadius: '50%',
                                _hover: {
                                    background: 'gray.200',
                                },
                                _focus: {
                                    outline: 'none',
                                    background: 'gray.200',
                                },
                                _active: {
                                    background: 'gray.200',
                                },
                            }}>
                            <Icon as={HiEllipsisHorizontal} sx={{
                                fontSize: 22,
                            }} />
                        </MenuButton>
                        <Portal>
                            <MenuList>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        onEdit?.(data);
                                    }}
                                    icon={<FaPencilAlt />}>
                                    Ubah Postingan
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleDeletePost();
                                    }}
                                    icon={<FaTrashAlt />}>
                                    Hapus Postingan
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
            <ModalFormKomentar
                isOpenComentForm={isOpenFormComment}
                onCloseFormComment={onCloseFormComment} />
        </Box>
    )
}
