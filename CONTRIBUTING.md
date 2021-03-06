# Contributing

## Documentation

### Structure

The structure is only composed of three-levels of headers (h1, h2, h4).  
The only required element is a h1 on the top of the file.

You can use **bold**, *italic* or ~~scratch~~.  
You can use images, list, quote and code as well.  

Always think about segmented blocks (maximum three lines) to increase readability.  
Make use of h3 to split the blocks or just a blank line.

**Example:**

```
# This is the main title of a page - same as summary title

## This is a subtitle for an important section - this is not required

This is a block text.  
With a second line.

#### I could add a subtitle too if necessary

This is a block text.  
With a second line.

#### Bold & co

This **word** is bold.  
This *word* is italic.  
This ~~word~~ is scratch.

#### A quote

> Quote me if you can !
```

**Render:**

> # This is the main title of a page - same as summary title
> 
> ## This is a subtitle for an important section - this is not required
> 
> This is a block text.  
> With a second line.
> 
> #### I could add a subtitle too if necessary
> 
> This is a block text.  
> With a second line.
> 
> #### Bold & co
> 
> This **word** is bold.  
> This *word* is italic.  
> This ~~word~~ is scratch.
> 
> #### A quote
> 
> > Quote me if you can !

### Summary

Composed only of the top-level titles (#h1).  
Is a bullet list.  
Is a link to a page.

**Example:**

```
- [My first header 1](https://c0zen.github.io/Cogeo/folder/first.md/)
- [My second header 1](https://c0zen.github.io/Cogeo/folder/second.md/)
```

**Render:**

> - [My first header 1](https://c0zen.github.io/Cogeo/folder/first.md/)
> - [My second header 1](https://c0zen.github.io/Cogeo/folder/second.md/)

### Errors design

When you want to declare that a possible error may occur, you should use the syntax bellow:

**Example:**

```
> If the username doesn't exist, the error XXX is return
```

**Render:**

> > If the username doesn't exist, the error XXX is return

### URL design

When you want to declare an url, you should wrap it into a code `` pattern.

#### Note design

When you want to add a note about something, you can add the keywork note as bold.  
Make sure than the note as a blank line before and after.

**Example:**

```
This is some text...

**Note:** this is a simple note.

And the text continue...
```

**Render:**

> This is some text...
> 
> **Note:** this is a simple note.
> 
> And the text continue...

### Next link

You should add a link to the next chapter on each page except the last one.  
Just copy/past then edit this link.

```
<a href="{{ site.baseUrl }}front-end/account/" class="btn btn-green">Chapitre suivant: Compte</a>
```
