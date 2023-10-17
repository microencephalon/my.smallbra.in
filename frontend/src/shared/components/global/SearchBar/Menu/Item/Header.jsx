const Header = ({ title, date }) => {
  return (
    <div className='search-menu-item-header'>
      <span className='search-item-title search-yield-title'>{title}</span>
      <span className='search-yield-date bp5-text-small'>{date}</span>
    </div>
  );
};

export default Header;
