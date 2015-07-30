#!usr/bin/env python
# -*- coding: utf-8 -*-

import web

urls = (
    '/', 'index',
    '/index.html', 'index',
    '/new_words.html', 'newWords'
)

render = web.template.render("templates/")

class index:
    def GET(self):
        return render.index()

class newWords:
    def GET(self):
        return render.new_words()

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
