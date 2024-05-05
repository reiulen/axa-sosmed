import React from 'react'
import { Box, Button, Flex, Text, Image } from '@chakra-ui/react'
import { LOGO_URL } from '@/utils/constants/asset.constant'

export default function Navbar() {
  return (
    <Box as="nav"
      sx={{
        background: '#fff',
        // boxShadow: "0 0 9px rgba(70,52,52,.15)",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 1px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        verticalAlign: "center",
        zIndex: 9999,
        // borderBottomWidth: "1px",
        // borderBottomColor: "gray.300",

      }}
    >
      <nav>
        <Flex
          sx={{
            maxW: '736px',
            margin: 'auto',
            width: '100%',
            justifyContent: 'space-between',
            align: 'center',
            py: 3,
            px: {
              base: 4,
              md: 0
            },
          }}
        >
          <Box mr={'auto'}>
            <Image src={LOGO_URL} alt="logo" height="35px" />
          </Box>
          <Box ml={'auto'}>
            Nav
          </Box>
        </Flex>
      </nav>

    </Box>
  )
}
