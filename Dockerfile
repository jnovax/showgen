FROM node:20-bookworm

RUN apt-get install -y --force-yes deb-multimedia-keyring \
    apt-get remove -y --force-yes ffmpeg \
    apt-get install -y --force-yes build-essential libmp3lame-dev libvorbis-dev libtheora-dev libspeex-dev yasm pkg-config libfaac-dev libopenjpeg-dev libx264-dev libav-tools ffmpeg

WORKDIR /code
ADD package.json package.json
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
