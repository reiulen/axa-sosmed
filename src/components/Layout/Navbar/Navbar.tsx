import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import { LOGO_URL } from '@/utils/constants/asset.constant'

export default function Navbar() {
  return (
    <Box as="nav"
      sx={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(5px)',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        verticalAlign: "center",
        zIndex: 9999,
        borderBottomWidth: "1px",
        borderBottomColor: "secondary.200",

      }}
    >
      <nav>
        <Flex
          sx={{
            maxW: '620px',
            margin: 'auto',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            {/* Nav */}
          </Box>
        </Flex>
      </nav>

    </Box>
  )
}
