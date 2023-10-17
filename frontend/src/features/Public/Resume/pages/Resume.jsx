import Content from '../components/Content';
import Global from '../../../../shared/components/global';
import Portfolio from '../../Portfolio/components';
import { useFetchData } from '../../../../shared/hooks';

function Resume() {
  const { isFetching, isNotFound } = useFetchData.resume.document();
  const Resume = { Spinner: Portfolio.Artifact.Spinner };

  if (isNotFound) {
    return <Global.ErrorCard responseCode={'404'} />;
  }

  if (isFetching && !isNotFound) {
    return <Resume.Spinner />;
  }

  return (
    <>
      <div id='resume-doc'>
        <Content />
      </div>
    </>
  );
}

export default Resume;
