import React from 'react'
import Navbar from './Navbar/Navbar'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <Box minH="100vh"
            sx={{
                width: "100%",
                maxW: {
                    base: "100%",
                    md: "620px"
                }, 
                margin: "0 auto",
            }}>
            <Navbar />
            <Box
                sx={{
                    width: "100%",
                    maxW: "620px",
                    minH: "100vh",
                    height: "100%",
                    borderLeftColor: "secondary.200",
                    borderLeftWidth: "1px",
                    borderRightColor: "secondary.200",
                    borderRightWidth: "1px",
                    py: {
                        base: 16
                    },
                    px: {
                        base: 6
                    },
                    backgroundColor: "rgba(255,255,255,1.00)"
                }}>
                <Outlet />
            </Box>

        </Box>
    )
}
