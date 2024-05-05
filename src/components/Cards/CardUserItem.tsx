import { Flex, Box, Text, Icon, Image, Button } from '@chakra-ui/react'
import { FaGlobeAsia, FaRegEnvelope } from 'react-icons/fa'
import { avatarName } from '@/utils/helpers/helper'
import { Link } from 'react-router-dom'

interface ICardsUserItem {
    user: TUser
}

export default function CardUserItem({
    user
}: ICardsUserItem) {
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderColor: 'gray.200',
                borderWidth: '1px',
                shadow: 'sm',
                borderRadius: 'lg',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                position: 'relative',
            }}>
            <Flex sx={{
                alignItems: 'start',
                gap: 4,
                flexDirection: {
                    base: 'column',
                    md: 'row'
                },
            }}>
                <Box sx={{
                    display: {
                        base: 'flex',
                        md: 'block'
                    },
                    alignItems: 'center',
                    justifyContent: 'center',
                    w: {
                        base: 'full',
                        md: '40px'

                    },
                }}>
                    <Image src={avatarName(user?.name)}
                        alt={user?.name}
                        sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'full',
                        }}
                    />
                </Box>
                <Box sx={{
                    textAlign: {
                        base: 'center',
                        md: 'left'
                    }
                }}>
                    <Text as="div" sx={{
                        fontWeight: 'semibold',
                        fontSize: 'md',
                    }}>
                        {user?.name}
                    </Text>
                    <Text as="div" sx={{
                        fontSize: 'sm',
                        color: 'gray.600',
                        fontWeight: 'regular',
                    }}>
                        @{user?.username}
                    </Text>
                    <Box sx={{
                        mt: 3,
                        textAlign: {
                            base: 'left',
                        },
                    }}>
                        <Box sx={{
                            flexWrap: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Icon as={FaRegEnvelope} color={'gray.500'} fontSize={13} />
                            <Text as="a"
                                target='_blank'
                                href={`mailto:${user?.email}`}
                                noOfLines={1}
                                sx={{
                                    fontSize: 13,
                                    color: 'blue.600',
                                    fontWeight: 'regular',
                                    verticalAlign: 'top',
                                    ml: 2,
                                }}>
                                {user?.email}
                            </Text>
                        </Box>
                        <Box
                            sx={{
                                flexWrap: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Icon as={FaGlobeAsia} color={'gray.500'} fontSize={13} />
                            <Text as="a"
                                target='_blank'
                                href={`https://${user?.website}`}
                                sx={{
                                    fontSize: 13,
                                    color: 'blue.600',
                                    fontWeight: 'regular',
                                    verticalAlign: 'top',
                                    ml: 2,
                                }}>
                                {user?.website}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>
            <Box sx={{
                mt: 'auto'
            }}>
                <Button as={Link} to={`/${user.id}`} sx={{
                    py: 4,
                }} colorScheme='blue' size='sm' rounded="md" w="full">
                    Lihat Profil
                </Button>
            </Box>
        </Box>
    )
}
