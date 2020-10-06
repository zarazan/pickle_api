FROM ruby:2.7-buster

RUN mkdir /app
WORKDIR /app

COPY Gemfile ./
COPY Gemfile.lock ./

RUN bundle install

COPY . .
