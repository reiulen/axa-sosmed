import CardPostItem from '@/components/Cards/CardPostItem'
import { Box, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ModalFormPostingan from '../modalFormPostingan'
import { useParams } from 'react-router-dom';
import { useDetailUser } from '@/stores/users/detail';
import { useDetailPost } from '@/stores/posts/detail';
import { useComments } from '@/stores/comments/store';
import CardCommentList from '@/components/Cards/CardCommentList';
import ModalFormKomentar from './modalFormKomentar';

export default function DetailPostinganIndex() {
  const params = useParams<{ user_id: string, post_id: string }>();
  const {  user_id, post_id } = params;
  const { isOpen: isOpenPostForm, onOpen: onOpenFormPost, onClose: onCloseFormPost } = useDisclosure()
  const { isOpen: isOpenFormComment, onOpen: onOpenFormComment, onClose: onCloseFormComment } = useDisclosure()
  const { user } = useDetailUser();
  const [dataEditPost, setDataEditPost] = useState<TPostForm>();
  const [dataEditComment, setDataEditComment] = useState<TComment>();
  const {getDetailPost, post} = useDetailPost();
  const {comments, getComments, loading} = useComments();

  useEffect(() => {
    getDetailPost(post_id as unknown as number)
    getComments(post_id as unknown as number)
  }, [user_id, post_id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardPostItem
        data={post}
        user={user}
        onEdit={(data: TPosts) => {
          setDataEditPost(data);
          onOpenFormPost();
        }}
        commentCount={comments.length}
      />
      <CardCommentList 
        isLoading={loading}
        data={comments}
        user={user}
        onEdit={(data: TComment) => {
          setDataEditComment(data);
          onOpenFormComment();
        }}
      />

      <ModalFormPostingan
        dataEdit={dataEditPost}
        setDataEdit={setDataEditPost}
        isOpenPostForm={isOpenPostForm}
        onCloseFormPost={onCloseFormPost} />

      <ModalFormKomentar
        dataEdit={dataEditComment}
        setDataEdit={setDataEditComment}
        isOpenComentForm={isOpenFormComment}
        onCloseFormComment={onCloseFormComment} />
    </Box>
  )
}
