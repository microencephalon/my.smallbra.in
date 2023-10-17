export const MetaDataAvatar = ({ author, src }) => {
  return (
    <img id='blog-metadata-profile-pic' src={src} alt={`${author}'s avatar`} />
  );
};

export const MetaDataInfo = ({ author, date }) => {
  const DateText = ({ date }) => {
    return <span style={{ fontSize: '14px' }}> {date}</span>;
  };

  const AuthorText = ({ author }) => {
    return (
      <span style={{ fontSize: '16px' }}>
        <em>{author}</em>
      </span>
    );
  };
  return (
    <div id='blog-metadata-info'>
      <AuthorText author={author} />
      <DateText date={date} />
    </div>
  );
};

export const MetaDataContainer = ({ children }) => (
  <div id='blog-metadata-container'>{children}</div>
);
