import { Box, Text, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
interface ICardsAlbumItem {
    album: TAlbums
}

export default function CardAlbumItem({
    album
}: ICardsAlbumItem) {
    const [loadImage, setLoadImage] = useState<boolean>(true);
    return (
        <Box
            as={Link}
            to={album.url ? album.url : `/${album?.userId}/album/${album?.id}`}
            target={album.url ? '_blank' : '_self'}
            sx={{
                backgroundColor: '#fff',
                borderColor: 'gray.200',
                borderWidth: '1px',
                shadow: 'sm',
                borderRadius: 'lg',
                minHeight: '70px',
            }}>
            {
                album?.thumbnailUrl && (
                    <Box>
                        <Image
                            src={album?.thumbnailUrl}
                            onLoad={() => {
                                setLoadImage(false)
                            }}
                            sx={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderTopRadius: 'lg',
                                background: loadImage ? 'gray.200' : 'transparent',
                                backdropFilter: loadImage ? 'blur(5px)' : 'none',
                            }}
                        />
                    </Box>
                )
            }
            <Box sx={{ px: 4, py: 3 }}>
                <Text
                    sx={{
                        fontSize: 'md',
                        color: 'gray.700',
                        fontWeight: 'semibold',
                    }}>
                    {album?.title}
                </Text>
            </Box>
        </Box>
    )
}
