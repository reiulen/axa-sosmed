import { ChakraProps, Skeleton as ChakraSkeleton } from '@chakra-ui/react'

interface ISkeletonProps {
    count?: number,
    height?: string
    width?: string
}

export default function Skeleton({
    count,
    ...rest
}: 
ISkeletonProps & React.ComponentProps<typeof ChakraSkeleton> & ChakraProps
) {
    if (count && count > 0) {
        return Array.from({ length: count }).map((_, index) => (
            <ChakraSkeleton key={index} {...rest} />
        ))
    } else {
        return <ChakraSkeleton {...rest} />
    }
}
