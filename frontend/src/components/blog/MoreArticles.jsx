import React from 'react';

const BlogMoreArticles = () => {
  return (
    <div className='article-recommendations-container'>
      {/* more article recommendations title */}
      <header class='more-articles-title'>
        <h2>More articles you might like...</h2>
      </header>
      <section class='more-articles'>
        <ul>
          <li>Article 1</li>
          <li>Article 2</li>
        </ul>
      </section>
    </div>
  );
};

export default BlogMoreArticles;
