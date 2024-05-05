import { avatarName } from '@/utils/helpers/helper'
import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export default function ProfilPostinganIndex() {
  return (
    <Box sx={{ 
        mx: -6,
        display: 'flex',
        flexWrap: 'column',
     }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 4
       }}>
        <Box>
            <Image src={avatarName('datan')} />
        </Box>
      </Box>
    </Box>
  )
}
