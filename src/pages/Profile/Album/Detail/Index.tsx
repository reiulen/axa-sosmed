import CardAlbumList from "@/components/Cards/CardAlbumList";
import { useDetailAlbum } from "@/stores/albums/detail";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailAlbumIndex() {
    const params = useParams<{ album_id: string }>();
    const { album_id } = params;
    const {photos, getDetailAlbum, loading} = useDetailAlbum();

    useEffect(() => {
        getDetailAlbum(album_id as unknown as number)
    }, [])
  return (
    <Box>
    <CardAlbumList data={photos} isLoading={loading} />
  </Box>
  )
}
