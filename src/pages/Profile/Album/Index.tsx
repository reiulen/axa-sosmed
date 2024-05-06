import CardAlbumList from "@/components/Cards/CardAlbumList";
import { useAlbums } from "@/stores/albums/store";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AlbumIndex() {
  const params = useParams<{ id: string }>();
  const { albums, getAlbums, loading } = useAlbums();

  useEffect(() => {
    getAlbums(params.id as unknown as number);
  }, []);

  return (
    <Box>
      <CardAlbumList data={albums} isLoading={loading} />
    </Box>
  )
}
