import { Box, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from '@chakra-ui/react'
import { avatarName } from '@/utils/helpers/helper'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { useAlertDialogStore } from '@/stores/alert/alertDialogStore'
import { useComments } from '@/stores/comments/store'

interface CardCommentItemProps {
    data: TComment
    user: TUser
    onEdit?: (data: TComment) => void
}

export default function CardCommentItem({
    data,
    user,
    onEdit,
}: CardCommentItemProps) {
    const { setAlertDialog, resetAlertDialog } = useAlertDialogStore();
    const { deleteComment } = useComments();


    const handleDeletePost = () => {
        setAlertDialog({
            isOpen: true,
            title: 'Hapus Komentar',
            message: `Apakah yakin ingin menghapus komentar ini?`,
            textConfirm: 'Hapus',
            textCancel: 'Batal',
            onConfirm: () => {
                deleteComment(data?.id as number)
                resetAlertDialog()
            },
            onCancel: () => {
                resetAlertDialog()
            }
        })
    }
    return (
        <Box
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
                    pr: 2,
                    pl: 12
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
                            fontSize: 'sm',
                            color: 'gray.800',
                        }}>
                            {data?.body}
                        </Text>
                    </Box>
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
                                    Ubah Komentar
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleDeletePost();
                                    }}
                                    icon={<FaTrashAlt />}>
                                    Hapus Komentar
                                </MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Box>
    )
}
