import { avatarName } from '@/utils/helpers/helper'
import { Box, Button, Image, Text, useDisclosure } from '@chakra-ui/react'
import ModalFormPostingan from './modalFormPostingan'

export default function ProfilPostinganIndex() {
    const { isOpen: isOpenPostForm, onOpen: onOpenFormPost, onClose: onCloseFormPost } = useDisclosure()
    return (
        <Box sx={{
            mx: -2,
            display: 'flex',
            flexWrap: 'column',
        }}>
            <Box
                onClick={() => onOpenFormPost()}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    py: 4,
                    px: 2,
                    width: '100%',
                    borderBottomColor: 'gray.200',
                    borderBottomWidth: 1,
                    mt: 1
                }}>
                <Box>
                    <Image src={avatarName('datan')} sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }} />
                </Box>
                <Box>
                    <Box >
                        <Text sx={{
                            fontSize: 'sm',
                            color: 'gray.500',
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
            <ModalFormPostingan isOpenPostForm={isOpenPostForm} onCloseFormPost={onCloseFormPost} />
        </Box>
    )
}
