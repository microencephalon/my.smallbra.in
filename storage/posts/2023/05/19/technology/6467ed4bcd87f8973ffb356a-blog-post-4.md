<br/>
# Markdown Test File {#title}

Most of this was made to conform to Markdown's original syntax and what Obsidian supports. There is full support of Markdown Basic Syntax. Support of [Markdown Extended Syntax](https://www.markdownguide.org/extended-syntax) includes everything except for:
- [Definition Lists](#definition-lists)
- [Emoji Shortcodes](#using-emoji-shortcodes)
- [Subscript](#subscript)
- [Superscript](#superscript)


## <span style="color:blue">Basic Syntax</span>

---

## Headings

```markdown
# Heading Level 1
## Heading level 2
## Heading level 3
#### Heading level 4
###### Heading level 6

<!-- At least three '=' or '-' under the text sets wraps the text in an <h1> or <h2>, respectively -->
Heading level 1
===

Heading level 2
---
```

```html
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>
```
##### <span class="example-in-action">Example in action:</span>

> # Heading level 1
> ## Heading level 2
> ### Heading level 3
> #### Heading level 4
> ##### Heading level 5
> ###### Heading level 6

<br />



---

## Horizontal Rulers


```markdown
---
```

```html
<hr />
```
##### <span class="example-in-action">Example in action:</span>
> ---


---

## Paragraphs (and Line Breaks)

When you end a paragraph, or any unit of a group of text, it is a [best Markdown practice](markdownguide.org/basic-syntax/#line-break-best-practices) to end the line with two or more spaces, followed by a return, which is what, at least in word processors, usually creates a new line when you press the `return` or `enter` key on your keyboard. If you're still unsure where that is, it is the key that sits above the `shift` key on the right side of your keyboard.


```markdown
<!-- The '␠' will be a visible character that represents a space
      , i.e. ' ' or ';nbsp'-->
<!-- The '␍' will be a visible character that represents a carriage return
      or new line, i.e. '\r', '\r\n', '&#13;', '&NewLine;', '\n', or <br /> -->
<!-- Scroll rightward to the end to see the carriage return and space placeholders. -->

<style>
  article > p {
    text-indent: 20px;
  }
</style>

"While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering."␠␠␍

"Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)␠␠␍

<span style="font-size:x-small;">**Source**: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. `https://plato.stanford.edu/entries/leibniz/`.</span>
```

```html

<style>
  article > p {
    text-indent: 20px;
  }
</style>

<p>
"While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering.
</p>
<p>
"Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)
</p>
<span style="font-size:x-small;"><strong>Source</strong>: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. `https://plato.stanford.edu/entries/leibniz/`.</span>
```

##### <span class="example-in-action">Example in action:</span>
> "While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering.  
>  
> Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)  
>
> <span style="font-size:x-small;">**Source**: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. `https://plato.stanford.edu/entries/leibniz/`.</span>

<br />

---

## Emphasis: Bold and Italic

```markdown
Love **is** bold
Love *is* bold
Love ***is*** bold
```

```html

<p>Love <strong>is</strong> bold</p>

<p>Love <em>is</em> bold</p>

<p>Love <strong><em>is</em></strong> bold</p>

```

##### <span class="example-in-action">Example in action:</span>

> Love **is** bold  

> Love *is* bold  

> Love ***is*** bold  

<br />

---

## Blockquotes

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
```
```html
<blockquote>
  <p>
    Dorothy followed her through many of the beautiful rooms in her castle.
  </p>
</blockquote>
```

##### <span class="example-in-action">Example in action:</span>
> > Dorothy followed her through many of the beautiful rooms in her castle.

<br />

### Blockquotes with Multiple Paragraphs

```markdown
> "While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering.
>
> Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)
>
> <span style="font-size:x-small;">**Source**: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. `https://plato.stanford.edu/entries/leibniz/`.</span>

```

```html
<style>
  article > p {
    text-indent: 20px;
  }
</style>

<blockquote>
    <!-- Two Paragraphs -->
    <p>
      "While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering.
    </p>
    <p>
      Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)
  </p>
  <!-- Citation -->
  <span style="font-size: x-small;">
    <strong>Source</strong>: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. <div class="code"><pre style="…"><code class="…" style ="…"><span>https://plato.stanford.edu/entries/leibniz/</span></code></pre></div>.
  </span>
</blockquote>
```
##### <span class="example-in-action">Example in action:</span>
> > "While Leibniz may have felt physically isolated from the intellectual scene of Europe, he did manage to stay connected through a vast network of correspondents. (Leibniz exchanged letters with over 1100 different people in the course of his life.) Despite the great demands placed on Leibniz as librarian, then historian, and Privy Councillor at the court of Hanover, he was able to complete work that, in its breadth, depth, and sheer quantity, is staggering.
> >
> > Leibniz's final years were bleak. He was engaged in a vituperative debate with Newton and his followers over the priority of the discovery of the calculus, even being accused of stealing Newton's ideas. (Most historians of mathematics now claim that Newton and Leibniz developed their ideas independently: Newton developing the ideas first with Leibniz the first to publish.) And at the court he was mocked for his wig and old-fashioned clothing (think 1670s Paris!). When Georg became George, the acrimony surrounding Leibniz in England was so great that Leibniz was asked to remain in Hanover rather than follow his employer to London. Leibniz died November 14, 1716." (Look, “Gottfried Wilhelm Leibniz.”)
> >
> > <span style="font-size:x-small;">**Source**: Look, Brandon C. “Gottfried Wilhelm Leibniz.” Stanford Encyclopedia of Philosophy, 2013. `https://plato.stanford.edu/entries/leibniz/`.</span>

<br />

### Nested Blockquotes

```markdown
> > Dorothy followed her through many of the beautiful rooms in her castle.

> > > The beautiful rooms contained many beautiful things.
```
```html
<blockquote>
  <blockquote>
    <p>
      Dorothy followed her through many of the beautiful rooms in her castle.
      </p>
      <blockquote>
        <p>
          The beautiful rooms contained many beautiful things.
        </p>
      </blockquote>
  </blockquote>
</blockquote>
```

##### <span class="example-in-action">Example in action:</span>
> > Dorothy followed her through many of the beautiful rooms in her castle.

> > > The beautiful rooms contained many beautiful things.

### Blockquotes with Other Elements

```markdown
> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>  
>  *Everything* is going according to **plan**.
```

```html
<blockquote>
  <h4 id="the-quarterly-results-look-great">The quarterly results look great!</h4>
  <ul>
    <li>Revenue was off the chart.</li>
    <li>
      <p>
        Profits were higher than ever.
      </p>
      <p>
        <em>Everything</em> is going according to <strong>plan</strong>.
      </p>
      </li>
    </ul>
</blockquote>
```



##### <span class="example-in-action">Example in action:</span>
> > #### The quarterly results look great!
> >
> > - Revenue was off the chart.  
<!-- DEBUG: Indentation on the second item when inside of a blockquote for some reason -->
> > - Profits were higher than ever.  
> >
> > *Everything* is going according to **plan**.

--- 

## Lists

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
```

```html
<ol start="1">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
```

##### <span class="example-in-action">Example in action:</span>
> 1. First item
> 2. Second item
> 3. Third item

### Unordered Lists

```markdown
- First item
- Second item
- Third item
```

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

##### <span class="example-in-action">Example in action:</span>
> - First item
> - Second item
> - Third item


### Starting Unordered List Items with Numbers

```markdown
- 1968\. A great year!
- I think 1969 was second best.
```

```html
<ul>
  <li>1968. A great year!</li>
  <li>I think 1969 was second best.</li>
</ul>
```


##### <span class="example-in-action">Example in action:</span>
- 1968\. A great year!
- I think 1969 was second best.



### Adding Elements in Lists

#### Paragraphs
<br />
"To add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab, as shown in the following examples." [[1](https://www.markdownguide.org/basic-syntax/#adding-elements-in-lists)]

```markdown
* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.
```

##### <span class="example-in-action">Example in action:</span>
* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.

#### Blockquotes

```markdown
* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.
```

##### <span class="example-in-action">Example in action:</span>

* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.

#### Code blocks {#code-blocks-in-blockquotes}

<!-- TODO: Indent code blocks when they are nested in a list -->

```markdown
1. Open the file.
2. Find the following code block on line 21:
```html
<html>
  <head>
    <title>Test</title>
  </head>
</html>
```

3. Update the title to match the name of your website.
```

##### <span class="example-in-action">Example in action:</span>
> 1. Open the file.
> 2. Find the following code block on line 21:

> ```html
<html>
  <head>
  <title>Test</title>
  </head>
</html>
```

> 3. Update the title to match the name of your website.

##### <span class="example-in-action">Example in action:</span>
#### Images

```markdown
1. Open the file containing the Linux mascot.
2. Marvel at its beauty.

    ![Tux, the Linux mascot](https://mdg.imgix.net/assets/images/tux.png?auto=format&fit=clip&q=40&w=100)

3. Close the file.
```

```html
<ol start="1">
  <li>Open the file containing the Linux mascot.</li>
  <li>
    <p>Marvel at its beauty.</p>
    <p> <img alt="Tux, the Linux mascot" src="https://mdg.imgix.net/assets/images/tux.png?auto=format&amp;fit=clip&amp;q=40&amp;w=100"></p>
  </li>
  <li>
    <p>Close the file.</p>
  </li>
</ol>
```


##### <span class="example-in-action">Example in action:</span>
1. Open the file containing the Linux mascot.
2. Marvel at its beauty.

    ![Tux, the Linux mascot](https://mdg.imgix.net/assets/images/tux.png?auto=format&fit=clip&q=40&w=100)

3. Close the file.


#### Nested lists

```markdown
1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item
```

##### <span class="example-in-action">Example in action:</span>
1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item

---

## Code

```markdown
At the command prompt, type `nano`.
```

```html
At the command prompt, type <code>`nano</code>.
```

##### <span class="example-in-action">Example in action:</span>
> At the command prompt, type `nano`.

### Escaping Backticks

```markdown
``Use `code` in your Markdown file.``
```

```html
<code>Use `code` in your Markdown file.</code>
```

##### <span class="example-in-action">Example in action:</span>
> ``Use `code` in your Markdown file.``

---

## Code Blocks {#code-blocks}

<!-- Using U+1FEF, "Greek Varia" '`' for standard backticks so it doesn't interrupt codeblock formation -->
```markdown
```html
  <html>
    <head>
    </head>
  </html>
```
```

```html
<code class="language-html" style="…">
  <span>  </span>
  <span class="token" style="…">&lt;</span>
  <span class="token" style="…">html</span>
  <span class="token" style="…">&gt;</span>
  <span>  </span>
  <span style=""></span>
  <span class="token" style="…;">&lt;</span>
  <span class="token" style="…">head</span>
  <span class="token" style="…">&gt;</span>
  <span></span>
  <span></span>
  <span class="token" style="…">&lt;/</span>
  <span class="token" style="…">
    head
  </span>
  <span class="token" style="…">&gt;</span>
  <span></span>
  <span>  </span>
  <span class="token" style="…">&lt;/</span>
  <span class="token" style="…">html</span>
  <span class="token" style="…">&gt;</span>
</code>
```

##### <span class="example-in-action">Example in action:</span>
> ```html
  <html>
    <head>
    </head>
  </html>
  ```

---

## Links

```markdown
My favorite search engine is [Duck Duck Go](https://duckduckgo.com)
```

```html
<p>My favorite search engine is <a href="https://duckduckgo.com">Duck Duck Go</a></p>
```

##### <span class="example-in-action">Example in action:</span>
> My favorite search engine is [Duck Duck Go](https://duckduckgo.com)

### Adding Titles

```markdown
My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").
```

```html
<p>My favorite search engine is <a href="https://duckduckgo.com" title="The best search engine for privacy">Duck Duck Go</a>.</p>
```

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").


##### <span class="example-in-action">Example in action:</span>
> My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").


### URLs and Email Addresses

```markdown
<https://www.markdownguide.org>
<fake@example.com>
```

```html
<p><a href="https://www.markdownguide.org">https://www.markdownguide.org</a></p>

<p><a href="mailto:fake@example.com">fake@example.com</a></p>

```
##### <span class="example-in-action">Example in action:</span>
> <https://www.markdownguide.org>  
  
> <fake@example.com>

### Formatting Links

```markdown
I love supporting the **[EFF](https://eff.org)**.  

This is the *[Markdown Guide](https://www.markdownguide.org)*.  

See the section on [`code`](#code).  
```

```html
<p>I love supporting the <strong><a href="https://eff.org">EFF</a></strong>.</p>
<p>This is the <em><a href="https://www.markdownguide.org">Markdown Guide</a></em>.</p>
<p>See the section on <a href="#code"><div class="code"><pre style="…"><code class="language-code-string" style="…"><span>code</span></code></pre></div></a>.</p>
```

##### <span class="example-in-action">Example in action:</span>
> I love supporting the **[EFF](https://eff.org)**.  
>  
> This is the *[Markdown Guide](https://www.markdownguide.org)*.  
>  
> See the section on [`code`](#code).  


### Reference-style Links {#reference-style-links}

```markdown
## Code Blocks {#code-blocks}
…
### Reference-style Links {#reference-style-links}

If you want to learn more about reference-style links, then go [here](#reference-style-links). If you want to learn more about formatting with regard to code blocks, then go to the "[Code Blocks](#code-blocks)" title.
```

```html
<p>
  If you want to learn more about reference-style links, then go <a href="#reference-style-links">here</a>. If you want to learn more about formatting with regard to code blocks, then go to the "<a href="#code-blocks">Code Blocks</a>" title.
</p>
```

If you want to learn more about reference-style links, then go [here](#reference-style-links). If you want to learn more about formatting with regard to code blocks, then go to the "[Code Blocks](#code-blocks)" title.

##### <span class="example-in-action">Example in action:</span>

> If you want to learn more about reference-style links, then go [here](#reference-style-links). If you want to learn more about formatting with regard to code blocks, then go to the "[Code Blocks](#code-blocks)" title.


---

## Images

```markdown
![The San Juan Mountains are beautiful!](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")
```

```html
<p>
  <img 
    alt="The San Juan Mountains are beautiful!" 
    title="San Juan Mountains" 
    src="https://mdg.imgix.net/assets/images/san-juan-mountains.jpg" 
  />
</p> 
```

##### <span class="example-in-action">Example in action:</span>

> ![The San Juan Mountains are beautiful!](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "San Juan Mountains")

### Linking Images

```markdown
[![An old rock in the desert](https://mdg.imgix.net/assets/images/shiprock.jpg?auto=format&fit=clip&q=40&w=1080 "Shiprock, New Mexico by Beau Rogers")](https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv)
```

```html
<p>
  <a href="https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv">
  <img 
    alt="An old rock in the desert" 
    title="Shiprock, New Mexico by Beau Rogers" 
    src="https://mdg.imgix.net/assets/images/shiprock.jpg?auto=format&amp;fit=clip&amp;q=40&amp;w=1080" 
  />
  </a>
</p>
```

##### <span class="example-in-action">Example in action:</span>

> [![An old rock in the desert](https://mdg.imgix.net/assets/images/shiprock.jpg?auto=format&fit=clip&q=40&w=1080 "Shiprock, New Mexico by Beau Rogers")](https://www.flickr.com/photos/beaurogers/31833779864/in/photolist-Qv3rFw-34mt9F-a9Cmfy-5Ha3Zi-9msKdv-o3hgjr-hWpUte-4WMsJ1-KUQ8N-deshUb-vssBD-6CQci6-8AFCiD-zsJWT-nNfsgB-dPDwZJ-bn9JGn-5HtSXY-6CUhAL-a4UTXB-ugPum-KUPSo-fBLNm-6CUmpy-4WMsc9-8a7D3T-83KJev-6CQ2bK-nNusHJ-a78rQH-nw3NvT-7aq2qf-8wwBso-3nNceh-ugSKP-4mh4kh-bbeeqH-a7biME-q3PtTf-brFpgb-cg38zw-bXMZc-nJPELD-f58Lmo-bXMYG-bz8AAi-bxNtNT-bXMYi-bXMY6-bXMYv)

---

## Escaping Characters

```markdown
\* Without the backslash, this would be a bullet in an unordered list.

\- Without the backslash, this would be a bullet in an unordered list.
```

```html
<p>* Without the backslash, this would be a bullet in an unordered list.</p>

<p>- Without the backslash, this would be a bullet in an unordered list.</p>
```

##### <span class="example-in-action">Example in action:</span>

> \* Without the backslash, this would be a bullet in an unordered list.  
>  
> \- Without the backslash, this would be a bullet in an unordered list.  


### Characters You Can Escape

You can use backslash to escape the following characters:

```markdown
| Character | Name |
| ------------ | ----- |
| \\ | backslash |
| \` | backtick |
| \* | asterisk |
| \_ | underscore |
| \{} | curly braces |
| \[] | brackets |
| \<> | angle brackets |
| \() | parentheses |
| \# | pound sign |
| \+ | plus sign |
| \- | minus sign (hyphen) |
| \. | dot |
| \! | exclamation mark |
| \| | pipe             |
```

```html
<table>
  <thead>
    <tr><th>Character</th><th>Name</th></tr>
  </thead>
  <tbody>
    <tr><td>\</td><td>backslash</td></tr>
    <tr><td>`</td><td>backtick</td></tr>
    <tr><td>*</td><td>asterisk</td></tr>
    <tr><td>_</td><td>underscore</td></tr>
    <tr><td>{}</td><td>curly braces</td></tr>
    <tr><td>[]</td><td>brackets</td></tr>
    <tr><td>&lt;&gt;</td><td>angle brackets</td></tr>
    <tr><td>()</td><td>parentheses</td></tr>
    <tr><td>#</td><td>pound sign</td></tr>
    <tr><td>+</td><td>plus sign</td></tr>
    <tr><td>-</td><td>minus sign (hyphen)</td></tr>
    <tr><td>.</td><td>dot</td></tr>
    <tr><td>!</td><td>exclamation mark</td></tr>
    <tr><td>|</td><td>pipe</td></tr>
  </tbody>
</table>
```

##### Examples in action:
> | Character | Name |
|------------ | ----- |
| \\ | backslash |
| \` | backtick |
| \* | asterisk |
| \_ | underscore |
| \{} | curly braces |
| \[] | brackets |
| \<> | angle brackets |
| \() | parentheses |
| \# | pound sign |
| \+ | plus sign |
| \- | minus sign (hyphen) |
| \. | dot |
| \! | exclamation mark |
| \| | pipe |


---

## HTML

```markdown
This **word** is bold. 
This <em>word</em> is italic. 
This <span style="color:green">**word**</span> is green and bold.  
```

```html
<p>This <strong>word</strong> is bold.</p>
<p>This <em>word</em> is italic.</p>
<p>This <span style="color:green"><strong>word</strong></span> is bold.</p>
```

##### <span class="example-in-action">Example in action:</span>
> This **word** is bold. 

> This <em>word</em> is italic. 

> This <span style="color:green">**word**</span> is green and bold.

---

## <span style="color:blue">Extended Syntax</span>

---

## Tables

```markdown
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

```html
<table>
  <thead>
  <tr>
    <th>Syntax</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Header</td>
      <td>Title</td>
      </tr>
    <tr>
      <td>Paragraph</td>
      <td>Text</td>
    </tr>
  </tbody>
</table>
```

##### <span class="example-in-action">Example in action:</span>
> | Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### Alignment

```markdown
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

```html
<table>
  <thead>
    <tr>
      <th style="text-align: left;">Syntax</th>
      <th style="text-align: center;">Description</th>
      <th style="text-align: right;">Test Text</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: left;">Header</td>
      <td style="text-align: center;">Title</td>
      <td style="text-align: right;">Here's this</td>
      </tr>
  <tr>
    <td style="text-align: left;">Paragraph</td>
    <td style="text-align: center;">Text</td>
    <td style="text-align: right;">And more</td>
  </tr>
  </tbody>
</table>
```

##### <span class="example-in-action">Example in action:</span>

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |


### Formatting Text in Tables

Cannot use *headings*, *blockquotes*, *lists*, *horizontal rules*, *images, or most *HTML tags*.  

```markdown
| Description | Test Text                                 |
|    :----:   |    :---:                                  |
| Link       | Here is a [link](https://www.example.com)   |
| Code        | This is `code`.      |
| Bold, Emphasis | This is a ***strong emphasis***.      |
```

```html
<table>
  <thead><tr><th style="text-align: center;">Description</th><th style="text-align: center;">Test Text</th></tr>
  </thead>
  <tbody>
    <tr><td style="text-align: center;">Link</td><td style="text-align: center;">Here is a <a href="https://www.example.com">link</a></td></tr>
    <tr><td style="text-align: center;">Code</td><td style="text-align: center;">This is <div class="code"><pre style="…"><code class="language-code-string" style="…"><span>code</span></code></pre></div>.</td></tr>
    <tr><td style="text-align: center;">Bold, Emphasis</td><td style="text-align: center;">This is a <strong><em>strong emphasis</em></strong>.</td></tr>
  </tbody>
</table>
```

##### <span class="example-in-action">Example in action:</span>
> | Description | Test Text                                 |
|    :----:   |    :---:                                  |
| Link       | Here is a [link](https://www.example.com)   |
| Code        | This is `code`.      |
| Bold, Emphasis | This is a ***strong emphasis***.      |


### Escaping Pipe Characters in Tables

Display `|` by escaping it with a backslash `\` before it.

##### <span class="example-in-action">Example in action:</span>

| Syntax      | Description | Test Text     |
| :---:        |    :----:   |          :---: |
| `\|`      | Escaped Pipe       | \|   |

---

## Fenced Code Blocks

For general use, see "[Code Blocks](#code-blocks)"

### Syntax Highlighting

```html
<!-- Markdown -->

```javascript  
// code goes here  
```  

```c  
// code goes here  
```  

```jsx  
// code goes here  
``` 
  
```python  
# code goes here  
``` 
```

```html
<pre><div class="code"><pre style="…"><code class="language-javascript" style="…"><span class="token" style="color: slategray">&sol;&sol; code goes here</span></code></pre></div></pre>
<pre><div class="code"><pre style="…"><code class="language-c" style="…"><span class="token" style="color: slategray">&sol;&sol; code goes here</span></code></pre></div></pre>
<pre><div class="code"><pre style="…"><code class="language-jsx" style="…"><span class="token" style="color: slategray">&sol;&sol; code goes here</span></code></pre></div></pre>
<pre><div class="code"><pre style="…"><code class="language-python" style="…"><span class="token" style="color: slategray">&num; code goes here</span></code></pre></div></pre>
```

##### Examples in Action:  

```javascript
// JavaScript
function getLargestNumber(numbers) {
  let largestNumber = numbers[0];
  for (let number of numbers) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}

const numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6];
const largestNumber = getLargestNumber(numbers);
console.log(`The largest number is ${largestNumber}`);
```

```c
// C
#include <stdio.h>

int main() {
    int numbers[] = {3, 7, 2, 1, 8, 4, 5, 9, 6};
    int largestNumber = numbers[0];
    int numElements = sizeof(numbers) / sizeof(numbers[0]);
    for (int i = 1; i <
```



```jsx
// JSX
import { ReactDOM } from 'react';

function getLargestNumber(numbers) {
  let largestNumber = numbers[0];
  for (let number of numbers) {
    if (number > largestNumber) {
      largestNumber = number;
    }
  }
  return largestNumber;
}

const numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6];
const largestNumber = getLargestNumber(numbers);
const element = <div>The largest number is {largestNumber}</div>;

ReactDOM.render(element, document.getElementById('root'));
```

```python
# Python
def get_largest_number(numbers):
    largest_number = numbers[0]
    for number in numbers:
        if number > largest_number:
            largest_number = number
    return largest_number

numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6]
largest_number = get_largest_number(numbers)
print(f"The largest number is {largest_number}")

```

```ruby
# Ruby
def get_largest_number(numbers)
  largest_number = numbers[0]
  numbers.each do |number|
    largest_number = number if number > largest_number
  end
  largest_number
end

numbers = [3, 7, 2, 1, 8, 4, 5, 9, 6]
largest_number = get_largest_number(numbers)
puts "The largest number is #{largest_number}"
```

```css
/* CSS */
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  background-color: #f2f2f2;
  line-height: 1.4;
}

/* Header styles */
header {
  background-color: #007bff;
  color: #fff;
  padding: 20px;
  text-align: center;
}
```

```shell
# shell
#!/bin/zsh

numbers=(3 7 2 1 8 4 5 9 6)

function get_largest_number {
  largest_number=${numbers[0]}
  for number in "${

```

```json
// JSON
{
  "company": "Acme Inc.",
  "employees": [
    {
      "name": "John Smith",
      "position": "Software Engineer",
      "salary": 100000,
      "hire_date": "2022-01-01"
    },
    {
      "name": "Jane Doe",
      "position": "Marketing Manager",
      "salary": 75000,
      "hire_date": "2022-02-15"
    },
    {
      "name": "Bob Johnson",
      "position": "Sales Representative",
      "salary": 50000,
      "hire_date": "2022-03-20"
    }
  ],
  "offices": {
    "New York": {
      "address": "123 Main St.",
      "phone": "(555) 123-4567"
    },
    "Los Angeles": {
      "address": "456 Maple Ave.",
      "phone": "(555) 987-6543"
    },
    "Chicago": {
      "address": "789 Oak St.",
      "phone": "(555) 555-5555"
    }
  },
  "projects": [
    {
      "name": "Project A",
      "start_date": "2022-04-01",
      "end_date": "2022-06-30",
      "team": [
        "John Smith",
        "Jane Doe"
      ]
    },
    {
      "name": "Project B",
      "start_date": "2022-07-01",
      "end_date": "2022-09-30",
      "team": [
        "John Smith",
        "Bob Johnson"
      ]
    },
    {
      "name": "Project C",
      "start_date": "2022-10-01",
      "end_date": "2022-12-31",
      "team": [
        "Jane Doe",
        "Bob Johnson"
      ]
    }
  ]
}

```

---

## Footnotes

Only support for simple footnotes format, not the `[^bignote]` example noted on [Markdownguide.org > Extended Syntax > Footnotes](https://www.markdownguide.org/extended-syntax/#footnotes).

```markdown
Here's a simple footnote[^1].␠␠␍  
Here is another simple footnote[^2].

[^1]: This is the first footnote.  Click [here](#footnotes) to return to "Footnotes".<br />
[^2]: This is the second footnote. Click [here](#footnotes) to return to "Footnotes".<br />
```

```html
<p>
  Here's a simple footnote<a href="#1"><sup>1</sup></a>.
  <br>
  Here is another simple footnote<a href="#2"><sup>2</sup></a>.
</p>

…
<footer>
  <div id="1">1: This is the first footnote. Click <a href="#footnotes">here</a> to return to "Footnotes".  <br></div>
  <div id="2">2: This is the second footnote. Click <a href="#footnotes">here</a> to return to "Footnotes". <br></div>
</footer>
```



##### <span class="example-in-action">Example in action:</span>

> Here's a simple footnote[^1].  
> Here is another simple footnote[^2].  

[^1]: This is the first footnote.  Click [here](#footnotes) to return to "Footnotes".<br />
[^2]: This is the second footnote.  Click [here](#footnotes) to return to "Footnotes".<br />



---

## Heading IDs (Custom IDs)
```markdown
<!-- Automated ID generated as #brave-new-world -->
## Brave New World

<!-- Custom ID is set to #book-title -->
## Brave New World {#book-title}
```

```html
<h2 id="brave-new-world">Brave New World</h2>
<h2 id="book-title">Brave New World</h2>
```

##### <span class="example-in-action">Example in action:</span>
> ## Brave New World  

> ## Brave New World {#book-title}

<br />

### Linking to Heading IDs

```markdown
Go here to begin reading about [Brave New World](#brave-new-world).

Go here to begin reading about [Brave New World](#book-title).
```

```html
Go here to begin reading about <a href="#brave-new-world">Brave New World</a>

Go here to begin reading about <a href="#book-title">Brave New World</a>
```

##### <span class="example-in-action">Example in action:</span>

> Go here to begin reading about [Brave New World](#brave-new-world) &nbsp; <span style="color:lightgrey">auto-generated ID</span> 

> Go here to begin reading about [Brave New World](#book-title) &nbsp; <span style="color:lightgrey">custom ID</span> 

---

## Definition Lists ◐ {#definition-lists}

No support included for [Definitions Lists](https://www.markdownguide.org/extended-syntax/#definition-lists).

---

## Strikethrough

```markdown
This ~~word~~ has been struck through.
```

```html
This <del>word</del> has been struck through.
```

##### <span class="example-in-action">Example in action:</span>

> This ~~word~~ has been struck through.

---

## Task Lists

```markdown
- [x] Write the press release.
- [ ] Update the website.
- [ ] Contact the media
```

```html
<ul>
  <li>
    <input readonly type="checkbox" checked> Write the press release.
    </li>
    <li>
      <input readonly type="checkbox"> Update the website.
    </li>
    <li>
      <input readonly type="checkbox"> Contact the media
    </li>
</ul>
```



> - [x] Write the press release.  
> - [ ] Update the website.  
> - [ ] Contact the media  

---

## Emoji

Emojis follow standard use and do not use "Emoji Shortcodes" like `:joy:`. If ":joy:", a shortcode, is used, it will not produce the respective "😂" emoji.

### Copying and Pasting Emoji

Emojis can be copied and pasted directly in. See <https://emojipedia.org> for a library of them or refer to an Emoji keyboard you may have built into your native operating system.

```markdown
🐵  
🐶  
🏴  
```

```html
<p>🐵</p>
<p>🐶</p>
<p>🏴</p>
```

##### Examples in action:

> 🐵  
> 🐶  
> 🏴  

### Using Emoji Shortcodes ◐ {#using-emoji-shortcodes}

No support for [Emoji Shortcodes](https://www.markdownguide.org/extended-syntax/#using-emoji-shortcodes).

---

## Highlight

```markdown
I need to highlight these ⩵very important words⩵.
```

```html
I need to highlight these <highlight>very important words</highlight>.

<!-- The <highlight> element is not native to HTML. It was created manually for the purposes of CSS styling and granting it the same level of importance as <del>, <strong>, <em> tags, etc. -->
```

##### <span class="example-in-action">Example in action:</span>

> I need to highlight these ==very important words==.

<br />

---

## Subscript ◐ {#subscript}

No suppport markdown syntax of [subscript](https://www.markdownguide.org/extended-syntax/#subscript).

To use subscript, just use the html tag `<sub>`. It does not follow what is seen in the "[Extended Syntax](https://www.markdownguide.org/extended-syntax/#subscript)" section of the markdown documentation.

```markdown
H<sub>2</sub>O
```

```html
H<sub>2</sub>O
```

##### <span class="example-in-action">Example in action:</span>
> H<sub>2</sub>O

---

## Superscript ◐ {#subscript}

No suppport markdown syntax of [superscript](https://www.markdownguide.org/extended-syntax/#superscript).

To use superscript, just use the html tag `<sup>`. It does not follow what is seen in the "[Extended Syntax](https://www.markdownguide.org/extended-syntax/#superscript)" section of the markdown documentation.

```markdown
10<sup>2</sup> = 100
```

```html
10<sup>2</sup> = 100
```

##### <span class="example-in-action">Example in action:</span>
> 10<sup>2</sup> = 100

---


## Automatic URL Linking

```markdown
http://www.example.com
```

```html
<a href="http://www.example.com">http://www.example.com</a>
```

##### <span class="example-in-action">Example in action:</span>
> http://www.example.com

### Disabling Automatic URL Linking

```markdown
`http://www.example.com`
```

```html
<code>http://www.example.com</code>
```

##### <span class="example-in-action">Example in action:</span>
> `http://www.example.com`

<br />
  
---  

