const Card = ({ data, Template, classNames, onClick, context }) => {
  const { containerClass } = classNames;
  const TemplateCard = Template;
  return (
    <div
      key={data._id}
      className={`${containerClass} ${data.isLoading ? '' : 'fade-in-card'}`}
    >
      <TemplateCard data={data} onClick={onClick} context={context} />
    </div>
  );
};

export default Card;
