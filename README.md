# Curriculum Wizard

```bash
# deployment
#start proyect server production
yarn build
# you cand run this command for display static website
docker run \
  --name=static_site --rm \
  -v "${PWD}/out:/usr/share/nginx/html" \
  -d -p "80:80" \
  nginx:1.25.3-alpine
```
