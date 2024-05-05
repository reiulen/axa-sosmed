import Skeleton from '@/components/Skeleton/Skeleton'
import { FetchDetailUserQuery } from '@/services/usersQuery'
import { avatarName } from '@/utils/helpers/helper'
import { Box, Flex, Image, Tab, TabList, Tabs, Text } from '@chakra-ui/react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'

type TMenuTabs = {
    title: string
    link: string
}

type TParams = {
    id: string
}

export default function ProfileIndex() {
    const params = useParams<TParams>();
    const { id: idUser } = params;
    const MenuTabs: TMenuTabs[] = [
        {
            title: 'Postingan',
            link: `/${idUser}`
        },
        {
            title: 'Album',
            link: `/${idUser}/album`
        }
    ]
    const location = useLocation();

    const {
        data: dataDetailUser,
        isLoading,
        isPending,
        isFetching,
    } = FetchDetailUserQuery(parseInt(idUser ?? '0'), {});

    return (
        <Box>
            <Flex
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 8,
                    pb: 6
                }}
            >
                <Box>
                    {
                        isLoading || isFetching || isPending ? (
                            <>
                                <Skeleton width="400px" height="50px" />
                            </>
                        ) : (
                            <>
                                <Text sx={{
                                    fontSize: 'xl',
                                    fontWeight: 'bold'
                                }}>
                                    {dataDetailUser?.name ?? '-'}
                                </Text>
                                <Text sx={{
                                    fontSize: 'md',
                                    color: 'gray.600'
                                }}>
                                    @{dataDetailUser?.username ?? '-'}
                                </Text>
                            </>
                        )
                    }
                </Box>
                <Box>
                    {
                        isLoading || isFetching || isPending ? (
                            <>
                                <Skeleton width="80px" height="80px" borderRadius="100%" />
                            </>
                        ) : (
                            <>
                                <Image src={avatarName(dataDetailUser?.name)} alt="logo" sx={{
                                    borderRadius: '100%',
                                    md: {
                                        width: '86px',
                                        height: '86px',
                                    },
                                }} />
                            </>
                        )
                    }
                </Box>
            </Flex>
            <Tabs
                defaultIndex={MenuTabs.findIndex(item => item.link === location.pathname)}
                isFitted
                sx={{
                    mx: -6
                }}>
                <TabList
                    sx={{
                        _focusVisible: {
                            outline: 'none'
                        },
                        _hover: {
                            borderLeft: 0,
                            borderRight: 0,
                        }
                    }}>
                    {
                        MenuTabs?.map((item, index) => (
                            <Tab
                                key={index}
                                as={Link}
                                to={item.link}
                                sx={{
                                    px: 4,
                                    py: 2,
                                    fontSize: 'md',
                                    fontWeight: 'semibold',
                                    color: 'gray.600',
                                    _selected: {
                                        color: 'primary.500',
                                        borderBottomColor: 'primary.500',
                                    },
                                    _focus: {
                                        boxShadow: 'none',
                                        outline: 0,
                                    },
                                    _active: {
                                        boxShadow: 'none',
                                    },
                                    _hover: {
                                        borderTop: 0,
                                        borderLeft: 0,
                                        borderRight: 0,
                                    },
                                    borderRadius: 0,
                                }}>
                                {item.title}
                            </Tab>
                        ))
                    }

                </TabList>
            </Tabs>
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}
