# 베이스 이미지
FROM node:20 as builder

WORKDIR /usr/src/app
#COPY package.json yarn.lock ./
COPY ./ ./

#RUN npm install yarn -g
RUN yarn
#EXPOSE 3000
CMD ["yarn", "build"]


FROM nginx as runner
COPY --from=builder /usr/src/app/build /usr/share/nginx/html