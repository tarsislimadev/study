FROM tmvdl/android:ionic

WORKDIR /app

RUN cordova create study com.brtmvdl.study study

WORKDIR /app/study

COPY www/html www

RUN cordova platform add android

RUN cordova build android
