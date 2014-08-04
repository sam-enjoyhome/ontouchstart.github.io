#!/bin/sh
PID=$(docker run --name ontouchstart.github.io -d ontouchstart/ontouchstart.github.io bash)
echo ontouchstart.github.io running in container $PID
docker run --rm -p 80:80 --volumes-from ontouchstart.github.io -it nginx
docker rm $PID
