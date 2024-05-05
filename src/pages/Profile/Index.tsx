import { avatarName } from '@/utils/helpers/helper'
import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'

type TMenuTabs = {
    title: string
    link: string
}

export default function ProfileIndex() {
    const params = useParams<{ id: string }>();
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
                    <Text sx={{
                        fontSize: 'xl',
                        fontWeight: 'bold'
                    }}>
                        Reihan Andika AM
                    </Text>
                    <Text sx={{
                        fontSize: 'md',
                        color: 'gray.600'
                    }}>
                        @reihanpraja
                    </Text>
                </Box>
                <Box>
                    <Image src={avatarName('Dadan')} alt="logo" sx={{
                        borderRadius: '100%',
                        md: {
                            width: '86px',
                            height: '86px',
                        },
                    }} />
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
