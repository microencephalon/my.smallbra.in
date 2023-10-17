// frontend/src/features/Public/Resume/components/Content.jsx
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import '../../../../store/css/resume.css';

import Markdown from 'markdown-to-jsx';
import { CenterSpinner as ResumeSpinner } from '../../../../shared/components/common/Spinners';
import { useFetchData } from '../../../../shared/hooks';
import { MD_OPTIONS } from '../../../../constants/resume';

const ResumeContent = () => {
  const { id: idFromParams } = useParams();

  const { resumeContent, loading } = useFetchData.resume.content(idFromParams);

  const hyphenateString = useMemo(() => {
    return (str) => str.toLowerCase().trim().replace(/\s+/g, '-');
  }, []);

  const resumeMdOptions = MD_OPTIONS({
    actions: { hyphenateString },
    classNamesInit: 'resume-',
  });

  if (loading) {
    return (
      <div id='resume-content'>
        <ResumeSpinner />
      </div>
    );
  } else {
    return (
      <div id='resume-content' style={{ paddingTop: 15 }}>
        <Markdown options={resumeMdOptions}>{resumeContent}</Markdown>
        <footer></footer>
      </div>
    );
  }
};

export default ResumeContent;
