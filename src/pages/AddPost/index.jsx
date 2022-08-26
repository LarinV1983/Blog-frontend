import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import {selectIsAuth} from '../../redux/slices/auth';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const navigate = useNavigate(); 
  const isRegister = useSelector(selectIsAuth);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const [Loading, setLoading] = React.useState(false);


  const FileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try{
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const {data} = await axios.post('/uploads', formData);
      setimageUrl(data.url);
      console.log(data);
    } catch(err){
      console.warn(err);
      alert('ОШИБКА ПРИ ЗАГРУЗКЕ ФАИЛА!');
    }
  };

  const onClickRemoveImage = () => {
    setimageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',      
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!isRegister) {
  return <Navigate to="/" />;
};

const LoadingFile = () => { 
  FileRef.current.click();
};

const onSubmit = async () => {
  try {
    setLoading(true);

    const fields = {
      title,
      imageUrl,
      tags: tags.split(','),
      text,
    };
    const {data} = await axios.post('/articles', fields);
    const id = data._id;
    navigate(`/articles/${id}`);
  } catch (err) {
    console.warn(err);
    alert('ОШИБКА ПРИ СОЗДАНИИ СТАТЬИ!');
  }
};


  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={LoadingFile} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={FileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:7777${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
      classes={{ root: styles.tags }} 
      variant="standard" 
      placeholder="Тэги"
      value={tags}
      onChange={(e) => setTags(e.target.value)} 
      fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
