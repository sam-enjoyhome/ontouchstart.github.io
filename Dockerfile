FROM ontouchstart/docker-github-pages-base
MAINTAINER ontouchstart <ontouchstart@gmail.com>

ADD / /src
RUN cd /src && jekyll build -d /usr/local/nginx/html
VOLUME ["/usr/local/nginx/html"]
