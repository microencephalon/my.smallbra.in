const Header = ({ title, date }) => {
  return (
    <div className='search-menu-item-header'>
      <span className='item-title mysb-omnibar-search-yield-title'>
        {title}
      </span>
      <span className='item-date mysb-omnibar-search-yield-date bp5-text-small'>
        {date}
      </span>
    </div>
  );
};

export default Header;
