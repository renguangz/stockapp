Github page URL:

https://renguangz.github.io/flask-react-stock-web/

# api Dockerfile

# FROM python:3.9

# WORKDIR /service

# COPY requirements.txt api.py .env ./
# RUN pip install -r ./requirements.txt
# ENV FLASK_ENV production

# EXPOSE 5000

# CMD ["gunicorn", "-b", ":5000", "api:app"]

# Client Dockerfile

# FROM node:latest as build-step

# WORKDIR /app

# COPY package.json .
# RUN npm install

# COPY . .
# RUN npm run build

# CMD ["npm", "start"]

# Build an nginx container
# FROM nginx:stable-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
# COPY /deployment/nginx.default.conf /etc/nginx/conf.d/default.conf 

# docker-compose.yml

# services:
# api:
# build:
# context: .
# dockerfile: Dockerfile
# image: flask-stock-api
# client:
# build:
# context: .
# dockerfile: Dockerfile
# image: react-stock-client
# ports: 
# - "3000:80"

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    const len = nums.length
    const last = len - 1
    if (len < 3) {
        return []
    }
    let arr = [];
    for (let i = 0; i < len - 2; i++) {
        // if (i > 0 && nums[i] === nums[i - 1]) continue
        let j = i + 1;
        let k = last;
        while (j < k) {
          let sums = nums[i] + nums[j] + nums[k]
          if (sums === 0) {
            arr.push([nums[i], nums[j], nums[k]])
            while (nums[j] == nums[j + 1]) j++;
            while (nums[k] == nums[k + 1]) k++;
            j++;
            k--;
          } else if (sums < 0) {
            j++;
          } else if (sums > 0) {
            k--;
          }
        }
    }
    
    const reduce_arr = arr.reduce((acc, cur) => {
       if (acc[cur]) {
           acc[cur]++
       } else {
           acc[cur] = 1
       }
        return acc
    }, {})
    let result = [];
    Object.keys(reduce_arr).forEach(item => {
        result.push(item.split(',').map(a => parseInt(a)))
    })
    
    return result
};