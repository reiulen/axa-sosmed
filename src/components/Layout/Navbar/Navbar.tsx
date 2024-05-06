import { Box, Flex, Icon, Image } from '@chakra-ui/react'
import { LOGO_URL } from '@/utils/constants/asset.constant'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from 'react-icons/fa6'

export default function Navbar() {
  const Navigate = useNavigate();
  const location = useLocation().pathname
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
        zIndex: 99,
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
            },
          }}
        >
          <Box as={Link} to={'/'} mr={'auto'}>
            <Image src={LOGO_URL} alt="logo" height="35px" />
          </Box>
          <Box ml={'auto'}>
            {/* Nav */}
            {
              location !== '/' && (
                <Box
                  as='a'
                  role='button'
                  sx={{
                    fontSize: 'sm',
                    fontWeight: 'semibold',
                    color: 'secondary.500',
                    textDecoration: 'underline',
                  }}
                  onClick={() => {
                    Navigate(-1)
                  }}>
                  <Icon as={FaArrowLeftLong} mr={2} verticalAlign={'middle'} />
                  Kembali
                </Box>
              )
            }
          </Box>
        </Flex>
      </nav>

    </Box>
  )
}
