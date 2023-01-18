docker network create project-network

docker-compose -f uchain/docker-compose.yml up -d
npm --prefix ./smartcontracts/ run execute-all
docker-compose -f registrator/docker-compose.yml up -d
docker-compose -f fileupload/docker-compose.yml up -d
docker-compose -f frontend/docker-compose.yml up -d

<!-- docker-compose -f uchain/docker-compose.yml down
docker-compose -f registrator/docker-compose.yml down
docker-compose -f fileupload/docker-compose.yml down
docker-compose -f frontend/docker-compose.yml down -->
