import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { ArrowRightAlt, Close } from '@mui/icons-material';
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../libs/firebase/firebase';

type Props = {
  isDetail: boolean;
  setIsDetail: React.Dispatch<React.SetStateAction<string | null>>;
  task: QueryDocumentSnapshot;
};

export const DetailTaskModal = ({ isDetail, setIsDetail, task }: Props) => {
  const [editTask, setEditTask] = React.useState<DocumentData>(task.data());

  const handleClose = () => {
    setIsDetail(null);
  };

  const onClickTaskSave = async () => {
    const ref = doc(db, 'tasks', task.id);
    await updateDoc(ref, {
      title: editTask.title,
      category: editTask.category,
      status: editTask.status,
      start_date: editTask.start_date,
      end_date: editTask.end_date,
      text: editTask.text,
    });
    handleClose();
  };

  return (
    <Box>
      <Modal open={isDetail} onClose={handleClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ width: '75%' }}>
              <Input
                sx={{
                  p: 1,
                  fontWeight: 'bold',
                  fontSize: '24px',
                  ':focus-within': {
                    border: '1px solid #00000033',
                    borderRadius: 2,
                  },
                }}
                disableUnderline
                fullWidth
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
              />
            </FormControl>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box>
            <FormControl sx={{ display: 'block', mt: 5, width: '50%' }}>
              <InputLabel>???????????????</InputLabel>
              <Select
                label="???????????????"
                fullWidth
                value={editTask.category}
                onChange={(e) =>
                  setEditTask({ ...editTask, category: e.target.value })
                }
              >
                <MenuItem value={'??????'}>??????</MenuItem>
                <MenuItem value={'????????????'}>????????????</MenuItem>
                <MenuItem value={'??????'}>??????</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ display: 'block', mt: 5, width: '50%' }}>
              <InputLabel>???????????????</InputLabel>
              <Select
                label="???????????????"
                fullWidth
                value={editTask.status}
                onChange={(e) =>
                  setEditTask({ ...editTask, status: e.target.value })
                }
              >
                <MenuItem value={'?????????'}>?????????</MenuItem>
                <MenuItem value={'?????????'}>?????????</MenuItem>
                <MenuItem value={'??????'}>??????</MenuItem>
              </Select>
            </FormControl>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="flex-end"
            >
              <FormControl sx={{ mt: 5, width: '30%' }}>
                <InputLabel shrink>?????????</InputLabel>
                <Input
                  type="date"
                  value={editTask.start_date}
                  onChange={(e) =>
                    setEditTask({ ...editTask, start_date: e.target.value })
                  }
                />
              </FormControl>

              <ArrowRightAlt />

              <FormControl sx={{ mt: 5, width: '30%' }}>
                <InputLabel shrink>?????????</InputLabel>
                <Input
                  type="date"
                  value={editTask.end_date}
                  onChange={(e) =>
                    setEditTask({ ...editTask, end_date: e.target.value })
                  }
                />
              </FormControl>
            </Box>

            <FormControl sx={{ display: 'block', mt: 5 }} fullWidth>
              <TextField
                label="??????"
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                value={editTask.text}
                onChange={(e) =>
                  setEditTask({ ...editTask, text: e.target.value })
                }
              />
            </FormControl>

            <Button
              sx={{ display: 'block', mt: 5, ml: 'auto' }}
              variant="contained"
              onClick={onClickTaskSave}
            >
              ??????
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
