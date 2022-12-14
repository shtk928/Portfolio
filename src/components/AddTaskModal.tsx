import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowRightAlt, Close } from '@mui/icons-material';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../libs/firebase/firebase';

type Props = {
  isAdd: boolean;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

type Task = {
  title: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  text: string;
};

const Today = new Date();

const defaultTask: Task = {
  title: '',
  category: 'なし',
  status: '開始前',
  start_date: `${Today.getFullYear()}-${Today.getMonth() + 1}-${Today.getDate()}`,
  end_date: `${Today.getFullYear()}-${Today.getMonth() + 1}-${Today.getDate()}`,
  text: '',
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

export const AddTaskModal = ({ isAdd, setIsAdd }: Props) => {
  const [task, setTask] = React.useState<Task>(defaultTask);

  const handleClose = () => {
    setIsAdd(!isAdd);
  };

  const onClickTaskSave = async () => {
    await addDoc(collection(db, 'tasks'), {
      title: task.title,
      category: task.category,
      status: task.status,
      start_date: task.start_date,
      end_date: task.end_date,
      text: task.text,
      timestamp: serverTimestamp(),
    });
    setTask(defaultTask);
    handleClose();
  };

  return (
    <Box>
      <Modal open={isAdd} onClose={handleClose}>
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" fontWeight="bold">
              タスク作成
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box>
            <FormControl sx={{ mt: 5, width: '75%' }}>
              <FormLabel sx={{ fontSize: '12px' }}>タイトル</FormLabel>
              <Input
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </FormControl>

            <FormControl sx={{ display: 'block', mt: 5, width: '50%' }}>
              <InputLabel>カテゴリー</InputLabel>
              <Select
                label="カテゴリー"
                fullWidth
                defaultValue={'なし'}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
              >
                <MenuItem value={'なし'}>なし</MenuItem>
                <MenuItem value={'書類関係'}>書類関係</MenuItem>
                <MenuItem value={'荷物'}>荷物</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ display: 'block', mt: 5, width: '50%' }}>
              <InputLabel>ステータス</InputLabel>
              <Select
                label="ステータス"
                fullWidth
                defaultValue={'開始前'}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              >
                <MenuItem value={'開始前'}>開始前</MenuItem>
                <MenuItem value={'作業中'}>作業中</MenuItem>
                <MenuItem value={'終了'}>終了</MenuItem>
              </Select>
            </FormControl>

            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="flex-end"
            >
              <FormControl sx={{ mt: 5, width: '30%' }}>
                <InputLabel shrink>開始日</InputLabel>
                <Input
                  type="date"
                  onChange={(e) =>
                    setTask({ ...task, start_date: e.target.value })
                  }
                />
              </FormControl>

              <ArrowRightAlt />

              <FormControl sx={{ mt: 5, width: '30%' }}>
                <InputLabel shrink>終了日</InputLabel>
                <Input
                  type="date"
                  onChange={(e) =>
                    setTask({ ...task, end_date: e.target.value })
                  }
                />
              </FormControl>
            </Box>

            <FormControl sx={{ display: 'block', mt: 5 }} fullWidth>
              <TextField
                label="詳細"
                variant="standard"
                fullWidth
                onChange={(e) => setTask({ ...task, text: e.target.value })}
              />
            </FormControl>

            <Button
              sx={{ display: 'block', mt: 5, ml: 'auto' }}
              variant="contained"
              onClick={onClickTaskSave}
            >
              保存
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
