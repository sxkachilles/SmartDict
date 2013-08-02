SmartDict
=========

A suite consisted of a Chrome extension and an iOS app aiming at effectively learning English words via surfing the web.

This is the Chrome extension part.

How to use?
===========

Press `ctrl + command + h` to hightlight all words from word database for current page, however even without that querying and highlighting one word is still supported, just press `alt` and double click one word to add it into word database.

Deleting word is not available with the extension, if which is necessary, use `window.localStorage.clear()` in background console. 

Credits
=======

[hint.css](https://github.com/chinchang/hint.css) for displaying tooltips.

[Pervasive GRE](https://github.com/yiransheng/Pervasive-GRE) for inspration.

[Youdao Dict](http://dict.youdao.com) for dictionary API.

TO-DOs
======

- affixes handling
- key binding
- remote synchronizing
- iOS app

Bug fix
=======

- 20130727, fix conflict with bootstrap
- 20120802, change to case insensitive
			optimize highlight logic and add highlight all words key bind `ctrl + command + h`