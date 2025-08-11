import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string; tag: NoteTag }) => void;
  onCancel: () => void;
}

const schema = yup.object().shape({
  title: yup.string().min(3).max(50).required('Title is required'),
  content: yup.string().max(500),
  tag: yup.mixed<NoteTag>().oneOf(['work', 'personal', 'idea']).required('Tag is required'),
});

const TAG_OPTIONS: { value: NoteTag; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'idea', label: 'Idea' },
];

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'work' as NoteTag }}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {TAG_OPTIONS.map((tag) => (
                <option key={tag.value} value={tag.value}>
                  {tag.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}